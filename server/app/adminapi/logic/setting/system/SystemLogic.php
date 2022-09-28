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
            [   'option' => 'PHP版本',
                'require' => '8.0版本以上',
                'status' => (int)compare_php('8.0.0'),
                'remark' => ''
            ]
        ];

        $auth = [
            [
                'dir' => '/runtime',
                'require' => 'runtime目录可写',
                'status' => (int)check_dir_write('runtime'),
                'remark' => ''
            ],
        ];

        return [
            'server' => $server,
            'env' => $env,
            'auth' => $auth,
        ];
    }

}