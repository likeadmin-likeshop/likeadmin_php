<?php
// +----------------------------------------------------------------------
// | likeadmin快速开发前后端分离管理后台（PHP版）
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | gitee下载：https://gitee.com/likeshop_gitee/likeadmin
// | github下载：https://github.com/likeshop-github/likeadmin
// | 访问官网：https://www.likeadmin.cn
// | likeadmin团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeadminTeam
// +----------------------------------------------------------------------
namespace app\common\service\sms;

use app\common\enum\notice\NoticeEnum;
use app\common\enum\notice\SmsEnum;
use app\common\logic\NoticeLogic;
use app\common\model\notice\NoticeSetting;
use app\common\model\notice\SmsLog;
use app\common\service\ConfigService;

/**
 * 短信服务
 * Class SmsMessageService
 * @package app\common\service
 */
class SmsMessageService
{
    protected $notice;
    protected $smsLog;

    public function send($params)
    {
        try {
            // 通知设置
            $noticeSetting = NoticeSetting::where('scene_id', $params['scene_id'])->findOrEmpty()->toArray();
            // 替换通知模板参数
            $content = $this->contentFormat($noticeSetting, $params);
            // 添加短信记录
            $this->smsLog = $this->addSmsLog($params, $content);
            // 添加通知记录
            $this->notice = NoticeLogic::addNotice($params, $noticeSetting, NoticeEnum::SMS, $content);
            // 发送短信
            $smsDriver = new SmsDriver();
            if(!is_null($smsDriver->getError())) {
                throw new \Exception($smsDriver->getError());
            }

            $result =  $smsDriver->send($params['params']['mobile'], [
                'template_id' => $noticeSetting['sms_notice']['template_id'],
                'params' => $this->setSmsParams($noticeSetting, $params)
            ]);
            if ($result === false) {
                // 发送失败更新短信记录
                $this->updateSmsLog($this->smsLog['id'], SmsEnum::SEND_FAIL, $smsDriver->getError());
                throw new \Exception($smsDriver->getError());
            }
            // 发送成功更新短信记录
            $this->updateSmsLog($this->smsLog['id'], SmsEnum::SEND_SUCCESS, $result);
            return true;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }


    /**
     * @notes 格式化消息内容
     * @param $noticeSetting
     * @param $params
     * @return array|mixed|string|string[]
     * @author 段誉
     * @date 2022/9/15 16:24
     */
    public function contentFormat($noticeSetting, $params)
    {
        $content = $noticeSetting['sms_notice']['content'];
        foreach($params['params'] as $k => $v) {
            $search = '${' . $k . '}';
            $content = str_replace($search, $v, $content);
        }
        return $content;
    }


    /**
     * @notes 添加短信记录
     * @param $params
     * @param $content
     * @return SmsLog|\think\Model
     * @author 段誉
     * @date 2022/9/15 16:24
     */
    public function addSmsLog($params, $content)
    {
        $data = [
            'scene_id'   => $params['scene_id'],
            'mobile'        => $params['params']['mobile'],
            'content'       => $content,
            'code'          => $params['params']['code'] ?? '',
            'send_status'   => SmsEnum::SEND_ING,
            'send_time'     => time(),
        ];
        return SmsLog::create($data);
    }


    /**
     * @notes 处理腾讯云短信参数
     * @param $noticeSetting
     * @param $params
     * @return array|mixed
     * @author 段誉
     * @date 2022/9/15 16:25
     */
    public function setSmsParams($noticeSetting, $params)
    {
        $defaultEngine = ConfigService::get('sms', 'engine', false);
        // 阿里云 且是 验证码类型
        if($defaultEngine != 'TENCENT' && in_array($params['scene_id'], NoticeEnum::SMS_SCENE)) {
            return ['code' => $params['params']['code']];
        }

        if($defaultEngine != 'TENCENT') {
            return $params['params'];
        }

        //腾讯云特殊处理
        $arr = [];
        $content = $noticeSetting['sms_notice']['content'];
        foreach ($params['params'] as $item => $val) {
            $search = '${' . $item . '}';
            if(strpos($content, $search) !== false && !in_array($item, $arr)) {
                //arr => 获的数组[nickname, order_sn] //顺序可能是乱的
                $arr[] = $item;
            }
        }

        //arr2 => 获得数组[nickname, order_sn] //调整好顺序的变量名数组
        $arr2 = [];
        if (!empty($arr)) {
            foreach ($arr as $v) {
                $key = strpos($content, $v);
                $arr2[$key] = $v;
            }
        }

        //格式化 arr2 => 以小到大的排序的数组
        ksort($arr2);
        $arr3 = array_values($arr2);

        //arr4 => 获取到变量数组的对应的值 [mofung, 123456789]
        $arr4 = [];
        foreach ($arr3 as $v2) {
            if(isset($params['params'][$v2])) {
                $arr4[] = $params['params'][$v2] . "";
            }
        }
        return $arr4;
    }


    /**
     * @notes 更新短信记录
     * @param $id
     * @param $status
     * @param $result
     * @author 段誉
     * @date 2022/9/15 16:25
     */
    public function updateSmsLog($id, $status, $result)
    {
        SmsLog::update([
            'id' => $id,
            'send_status' => $status,
            'results' => json_encode($result, JSON_UNESCAPED_UNICODE)
        ]);
    }
}