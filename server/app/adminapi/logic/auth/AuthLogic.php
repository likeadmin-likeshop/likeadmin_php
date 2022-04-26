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

namespace app\adminapi\logic\auth;

use think\facade\Config;

/**
 * 权限功能类
 * Class AuthLogic
 * @package app\adminapi\logic\auth
 */
class AuthLogic
{
    /**
     * @notes 获取菜单
     * @return array
     * @author 段誉
     * @date 2021/12/27 17:22
     */
    public static function getMenu() : array
    {
        return Config::get('menu');
    }

    /**
     * @notes 获取权限
     * @param array $authKeys array-返回指定权限
     * @return array
     * @author cjhao
     * @date 2021/8/26 11:09
     */
    public static function getAuth(array $authKeys = []):array
    {
        $authConfigList = Config::get('auth');
        //获取指定权限
        if(!empty($authKeys)){
            $authList = [];
            foreach ($authKeys as $keys){
                $keyList = explode('/',$keys);
                $authConfig = $authConfigList[$keyList[0]] ?? [];
                if(empty($authConfig)){
                    continue;
                }
                $keyList = explode('.',$keyList[1]);

                $buttonAuth = $authConfig[$keyList[0]][$keyList[1]]['button_auth'] ?? [];
                $actionAuth = $authConfig[$keyList[0]][$keyList[1]]['action_auth'] ?? [];

                $authList = [
                    'button_auth'   => array_merge($authList['button_auth'] ?? [],$buttonAuth),
                    'action_auth'   => array_merge($authList['action_auth'] ?? [],$actionAuth),
                ];
            }
            return $authList;
        }
        return $authConfigList;

    }
}