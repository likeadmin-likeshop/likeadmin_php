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

namespace app\adminapi\logic\auth;

use app\common\{
    cache\AdminAuthCache,
    model\auth\RoleAuthIndex,
    model\auth\Role,
    logic\BaseLogic
};
use think\facade\Db;

/**
 * 角色逻辑层
 * Class RoleLogic
 * @package app\adminapi\logic\auth
 */
class RoleLogic extends BaseLogic
{

    /**
     * @notes 添加角色
     * @param $params
     * @author cjhao
     * @date 2021/8/25 16:08
     */
    public function add(array $params)
    {
        Db::startTrans();
        try{

            $authKeys = $params['auth_keys'];
            //处理规格值
            array_walk($authKeys, function (&$auth){
                $auth = ['auth_key'=>$auth];
            });

            $role = new Role();
            $role->name = $params['name'];
            $role->desc = $params['desc'];
            $role->save();
            $role->roleAuthIndex()->saveAll($authKeys);

            Db::commit();
            return true;

        } catch (\Exception $e) {
            Db::rollback();
            return $e->getMessage();
        }

    }

    /**
     * @notes 编辑角色
     * @param array $params
     * @return bool|string
     * @author cjhao
     * @date 2021/8/25 20:47
     */
    public function edit(array $params)
    {
        Db::startTrans();
        try{

            $authKeys = $params['auth_keys'];
            //处理规格值
            array_walk($authKeys, function (&$auth){
                $auth = ['auth_key'=>$auth];
            });

            $role = Role::find($params['id']);
            RoleAuthIndex::where(['role_id'=>$params['id']])->delete();

            $role->name = $params['name'];
            $role->desc = $params['desc'];
            $role->save();
            $role->roleAuthIndex()->saveAll($authKeys);
            (new AdminAuthCache())->deleteTag();
            Db::commit();
            return true;

        } catch (\Exception $e) {
            Db::rollback();
            return $e->getMessage();
        }

    }

    /**
     * @notes 删除角色
     * @param int $id
     * @return bool
     * @author cjhao
     * @date 2021/8/25 20:47
     */
    public static function delete(int $id)
    {
        Role::destroy(['id'=>$id]);
        (new AdminAuthCache())->deleteTag();
        return true;
    }


    /**
     * @notes 角色详情
     * @param int $id
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author cjhao
     * @date 2021/8/25 17:58
     */
    public function detail(int $id):array
    {
        $detail = Role::field('id,name,desc')
            ->find($id);
        $authList = $detail->roleAuthIndex()->select()->toArray();
        $authKeys = array_column($authList,'auth_key');
        $detail->auth_keys = $authKeys;
        return $detail->toArray();
    }


}