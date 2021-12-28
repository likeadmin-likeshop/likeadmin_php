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

namespace app\adminapi\logic\setting\system;


use app\common\logic\BaseLogic;

/**
 * Class SystemLogic
 * @package app\adminapi\logic\setting\system
 */
class SystemLogic extends BaseLogic
{

    /**
     * @notes 系统环境信息
     * @return \array[][]
     * @author 段誉
     * @date 2021/12/28 18:35
     */
    public static function getInfo() : array
    {
        $server = [
            ['param' => '服务器操作系统', 'value' => PHP_OS],
            ['param' => 'web服务器环境', 'value' => $_SERVER['SERVER_SOFTWARE']],
            ['param' => 'PHP版本', 'value' => PHP_VERSION],
        ];

        $env = [
            ['option' => 'PHP版本', 'require' => '8.0版本以上', 'status' => (int)comparePHP('8.0.0'), 'remark' => '']
        ];

        $auth = [
            ['dir' => '/runtime', 'require' => 'runtime目录可写', 'status' => (int)checkDirWrite('runtime'), 'remark' => ''],
        ];

        return [
            'server' => $server,
            'env' => $env,
            'auth' => $auth,
        ];
    }

}