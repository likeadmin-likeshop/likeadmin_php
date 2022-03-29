<?php
// +----------------------------------------------------------------------
// | likeshop100%开源免费商用商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshopTeam
// +----------------------------------------------------------------------

namespace app\adminapi\validate\notice;

use app\common\validate\BaseValidate;

/**
 * 短信配置验证
 * Class SmsConfigValidate
 * @package app\adminapi\validate\notice
 */
class SmsConfigValidate extends BaseValidate
{
    protected $rule = [
        'type' => 'require',
        'sign' => 'require',
        'app_id' => 'requireIf:type,tencent',
        'app_key' => 'requireIf:type,ali',
        'secret_id' => 'requireIf:type,tencent',
        'secret_key' => 'require',
        'status' => 'require',
    ];

    protected $message = [
        'type.require' => '请选择类型',
        'sign.require' => '请输入签名',
        'app_id.requireIf' => '请输入app_id',
        'app_key.requireIf' => '请输入app_key',
        'secret_id.requireIf' => '请输入secret_id',
        'secret_key.require' => '请输入secret_key',
        'status.require' => '请选择状态',
    ];


    protected function sceneDetail()
    {
        return $this->only(['type']);
    }
}