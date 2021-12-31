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

namespace app\adminapi\logic;

use app\common\{
    cache\AdminAuthCache,
    service\ConfigService,
    service\FileService
};

/**
 * 配置类逻辑层
 * Class ConfigLogic
 * @package app\adminapi\logic
 */
class ConfigLogic
{
    /**
     * @notes 获取配置
     * @return array
     * @author 段誉
     * @date 2021/12/31 11:03
     */
    public static function getConfig(): array
    {
        $config = [
            // 文件域名
            'oss_domain' => FileService::getFileUrl('', 'domain'),

            // 网站名称
            'web_name' => ConfigService::get('website', 'name'),
            // 网站图标
            'web_favicon' => FileService::getFileUrl(ConfigService::get('website', 'web_favicon')),
            // 网站logo
            'web_logo' => FileService::getFileUrl(ConfigService::get('website', 'web_logo')),
            // 登录页
            'login_image' => FileService::getFileUrl(ConfigService::get('website', 'login_image')),

            // 版权信息
            'copyright_info' => ConfigService::get('copyright', 'info'),
            // icp备案号
            'icp_number' => ConfigService::get('copyright', 'icp_number'),
            // icp备案号链接
            'icp_link' => ConfigService::get('copyright', 'icp_link'),
            // 公安备案号
            'public_number' => ConfigService::get('copyright', 'public_number'),
            // 公安备案号链接
            'public_link' => ConfigService::get('copyright', 'public_link'),
        ];
        return $config;
    }


    /**
     * @notes 获取菜单权限
     * @param array $adminInfo
     * @return array
     * @author 段誉
     * @date 2021/12/27 16:00
     */
    public static function getAuth(array $adminInfo): array
    {
        $data = [
            'root' => $adminInfo['root'],
            'auth' => [],
        ];
        if (1 == $adminInfo['root']) {
            return $data;
        }
        $adminAuthCache = new AdminAuthCache($adminInfo['admin_id']);
        $pageAuth = $adminAuthCache->getAdminPageAuth();
        $data['auth'] = $pageAuth;

        return $data;
    }


}