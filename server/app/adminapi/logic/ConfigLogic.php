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
     * @author cjhao
     * @date 2021/8/19 16:28
     */
    public static function getConfig(): array
    {
        $data = [
            'oss_domain' => FileService::getFileUrl(),
            'copyright' => ConfigService::get('shop', 'copyright', ''),
            'record_number' => ConfigService::get('shop', 'record_number', ''),
            'record_system_link' => ConfigService::get('shop', 'record_system_link', ''),
            'name' => ConfigService::get('shop', 'name'),
            'logo' => FileService::getFileUrl(ConfigService::get('shop', 'logo')),
            'admin_login_image' => FileService::getFileUrl(ConfigService::get('shop', 'admin_login_image'))
        ];
        return $data;
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