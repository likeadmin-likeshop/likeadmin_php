<?php
// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
// +----------------------------------------------------------------------

namespace app\common\model\notice;


use app\common\enum\DefaultEnum;
use app\common\enum\NoticeEnum;
use app\common\enum\YesNoEnum;
use app\common\model\BaseModel;

class NoticeSetting extends BaseModel
{
    protected $name = 'dev_notice_setting';


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