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

namespace app\common\model\notice;


use app\common\enum\DefaultEnum;
use app\common\enum\notice\NoticeEnum;
use app\common\model\BaseModel;

class NoticeSetting extends BaseModel
{

    /**
     * @notes 短信通知状态
     * @param $value
     * @param $data
     * @return string|string[]
     * @author ljj
     * @date 2022/2/16 3:22 下午
     */
    public function getSmsStatusDescAttr($value,$data)
    {
        if ($data['sms_notice']) {
            $sms_text = json_decode($data['sms_notice'],true);
            return DefaultEnum::getEnableDesc($sms_text['status']);
        }else {
            return '停用';
        }
    }

    /**
     * @notes 通知类型
     * @param $value
     * @param $data
     * @return string|string[]
     * @author ljj
     * @date 2022/2/17 2:50 下午
     */
    public function getTypeDescAttr($value,$data)
    {
        return NoticeEnum::getTypeDesc($data['type']);
    }


    /**
     * @notes 接收者描述获取器
     * @param $value
     * @return string
     * @author Tab
     * @date 2021/8/18 16:42
     */
    public function getRecipientDescAttr($value)
    {
        $desc = [
            1 => '买家',
            2 => '卖家',
        ];
        return $desc[$value] ?? '';
    }

    /**
     * @notes 系统通知获取器
     * @param $value
     * @return array|mixed
     * @author Tab
     * @date 2021/8/18 19:11
     */
    public function getSystemNoticeAttr($value)
    {
        return empty($value) ? [] : json_decode($value, true);
    }

    /**
     * @notes 短信通知获取器
     * @param $value
     * @return array|mixed
     * @author Tab
     * @date 2021/8/18 19:12
     */
    public function getSmsNoticeAttr($value)
    {
        return empty($value) ? [] : json_decode($value, true);
    }

    /**
     * @notes 公众号通知获取器
     * @param $value
     * @return array|mixed
     * @author Tab
     * @date 2021/8/18 19:13
     */
    public function getOaNoticeAttr($value)
    {
        return empty($value) ? [] : json_decode($value, true);
    }

    /**
     * @notes 小程序通知获取器
     * @param $value
     * @return array|mixed
     * @author Tab
     * @date 2021/8/18 19:13
     */
    public function getMnpNoticeAttr($value)
    {
        return empty($value) ? [] : json_decode($value, true);
    }
}