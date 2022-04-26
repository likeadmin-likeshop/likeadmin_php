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

namespace app\common\cache;

use app\adminapi\logic\auth\AuthLogic;
use app\common\{model\auth\Admin};
use think\facade\Config;

/**
 * 管理员权限缓存
 * Class AdminAuthCache
 * @package app\common\cache
 */
class AdminAuthCache extends BaseCache
{
    private $prefix = 'admin_auth_';
    private $authConfigList = [];
    private $cacheMd5Key = '';      //权限文件MD5的key
    private $cacheAllKey = '';      //全部权限的key
    private $caheUrlKey = '';       //管理员的url缓存key
    private $cahePageKey = '';      //管理员的page缓存key
    private $authMd5 = '';          //权限文件MD5的值
    private $adminId = '';

    public function __construct($adminId = '')
    {
        parent::__construct();

        $this->adminId = $adminId;
        $this->authConfigList = Config::get('auth');
        // 当前权限配置文件的md5
        $this->authMd5 = md5(json_encode($this->authConfigList));

        $this->cacheMd5Key = $this->prefix . 'md5';
        $this->cacheAllKey = $this->prefix . 'all';
        $this->caheUrlKey = $this->prefix . 'url_' . $this->adminId;
        $this->cahePageKey = $this->prefix . 'page_' . $this->adminId;

        $cacheAuthMd5 = $this->get($this->cacheMd5Key);
        $cacheAuth = $this->get($this->cacheAllKey);
        //权限配置文件和缓存的配置文件对比，不一样说明权限配置文件已修改，清理缓存
        if ($this->authMd5 !== $cacheAuthMd5 || empty($cacheAuth)) {
            $this->deleteTag();
        }
    }


    /**
     * @notes 获取管理权限uri
     * @param $adminId
     * @return array|mixed
     * @author 令狐冲
     * @date 2021/8/19 15:27
     */
    public function getAdminUri()
    {
        //从缓存获取，直接返回
        $urisAuth = $this->get($this->caheUrlKey);
        if ($urisAuth) {
            return $urisAuth;
        }

        //获取角色所有权限id
        $roleAuthKeys = $this->getKeyAuth($this->adminId);
        if (empty($roleAuthKeys)) {
            return [];
        }

        //获取角色权限uri
        $urisAuth = AuthLogic::getAuth($roleAuthKeys);
        $this->set($this->caheUrlKey, $urisAuth, 3600);

        //保存到缓存并读取返回
        return $urisAuth;
    }


    /**
     * @notes 获取全部权限uri
     * @return array|mixed
     * @author cjhao
     * @date 2021/9/13 11:41
     */
    public function getAllUri()
    {
        $cacheAuth = $this->get($this->cacheAllKey);
        if ($cacheAuth) {
            return $cacheAuth;
        }

        foreach ($this->authConfigList as $authKey => $authConfig) {
            foreach ($authConfig as $authValList) {
                array_shift($authValList);
                foreach ($authValList as $authVal) {
                    $buttonAuth = $authVal['button_auth'] ?? [];
                    $actionAuth = $authVal['action_auth'] ?? [];
                    $authList = [
                        'button_auth' => array_merge($authList['button_auth'] ?? [], $buttonAuth),
                        'action_auth' => array_merge($authList['action_auth'] ?? [], $actionAuth),
                    ];
                }
            }
        }

        //保存到缓存并读取返回
        $this->set($this->cacheMd5Key, $this->authMd5, null);
        $this->set($this->cacheAllKey, $authList, null);
        return $authList;
    }


    /**
     * @notes 获取管理员页面权限
     * @param int $adminId
     * @return array
     * @author cjhao
     * @date 2021/10/13 17:43
     */
    public function getAdminPageAuth(): array
    {
        //从缓存获取，直接返回
        $pageAuth = $this->get($this->cahePageKey);
        if ($pageAuth) {
            return $pageAuth;
        }

        $roleAuthKeys = $this->getKeyAuth($this->adminId);
        if (empty($roleAuthKeys)) {
            return [];
        }

        $authConfigList = [];
        //处理权限数据结构
        foreach ($this->authConfigList as $configKey => $configList) {
            foreach ($configList as $authKey => $authVal) {
                $pagePathList = array_shift($authVal);
                if (is_string($pagePathList)) {
                    $pagePathList = [$pagePathList];
                }
                $pagePath = current($pagePathList);
                $buttonAuth = [];
                foreach ($authVal as $key => $auth) {
                    $authKeys = $configKey . '/' . $authKey . '.' . $key;
                    if (in_array($authKeys, $roleAuthKeys)) {
                        $buttonAuth = array_merge($buttonAuth, $auth['button_auth']);
                    }
                }
                //相同的接口分开。
                $authConfigList[$pagePath] = $buttonAuth;
                foreach ($pagePathList as $pagePath) {
                    $authConfigList[$pagePath] = $buttonAuth;
                }
            }
        }

        //设置缓存
        $this->set($this->cahePageKey, $authConfigList, 3600);
        //保存到缓存并读取返回
        return $authConfigList;
    }


    /**
     * @notes 获取管理员权限
     * @param int $adminId
     * @return array
     * @author 段誉
     * @date 2021/12/29 9:18
     */
    public function getKeyAuth(int $adminId) : array
    {
        $role = Admin::with(['role_auth_index'])
            ->where(['id' => $adminId])
            ->findOrEmpty()->toArray();
        if (empty($role)) {
            return [];
        }
        return array_column($role['role_auth_index'], 'auth_key');
    }

    /**
     * @notes 清理管理员缓存
     * @return bool
     * @author cjhao
     * @date 2021/10/13 18:47
     */
    public function clearAuthCache()
    {
        $this->clear($this->cahePageKey);
        $this->clear($this->caheUrlKey);
        return true;
    }

}