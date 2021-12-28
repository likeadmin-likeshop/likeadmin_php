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

namespace app\adminapi\validate\setting;

use app\common\validate\BaseValidate;

/**
 * 网站设置验证器
 * Class WebSettingValidate
 * @package app\adminapi\validate\setting
 */
class WebSettingValidate extends BaseValidate
{
    protected $rule = [
        'name' => 'require|max:12',
        'web_favicon' => 'require',
        'web_logo' => 'require',
        'login_image' => 'require',
    ];

    protected $message = [
        'name.require' => '请填写网站名称',
        'name.max' => '网站名称最长为12个字符',
        'web_favicon.require' => '请上传网站图标',
        'web_logo.require' => '请上传网站logo',
        'login_image.require' => '请上传登录页广告图',
    ];

    protected $scene = [
        'website' => ['name', 'web_favicon', 'web_logo', 'login_image'],
    ];
}