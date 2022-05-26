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

namespace app\adminapi\logic\dept;

use app\common\logic\BaseLogic;
use app\common\model\dept\Dept;


/**
 * 部门管理逻辑
 * Class DeptLogic
 * @package app\adminapi\logic\dept
 */
class DeptLogic extends BaseLogic
{


    /**
     * @notes 上级部门
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/5/26 18:36
     */
    public static function leaderDept()
    {
        $lists = Dept::field(['id','name'])->where(['status' => 1])
            ->order(['sort' => 'desc', 'id' => 'desc'])
            ->select()
            ->toArray();
        return $lists;
    }


    /**
     * @notes 添加部门
     * @param array $params
     * @author 段誉
     * @date 2022/5/25 18:20
     */
    public static function add(array $params)
    {
        Dept::create([
            'pid' => $params['pid'],
            'name' => $params['name'],
            'leader' => $params['leader'] ?? '',
            'mobile' => $params['mobile'] ?? '',
            'status' => $params['status'],
            'sort' => $params['sort'] ?? 0
        ]);
    }


    /**
     * @notes 编辑部门
     * @param array $params
     * @return bool
     * @author 段誉
     * @date 2022/5/25 18:39
     */
    public static function edit(array $params) : bool
    {
        try {
            Dept::update([
                'id' => $params['id'],
                'pid' => $params['pid'],
                'name' => $params['name'],
                'leader' => $params['leader'] ?? '',
                'mobile' => $params['mobile'] ?? '',
                'status' => $params['status'],
                'sort' => $params['sort'] ?? 0
            ]);
            return true;
        } catch (\Exception $e) {
            self::setError($e->getMessage());
            return false;
        }
    }


    /**
     * @notes 删除部门
     * @param array $params
     * @author 段誉
     * @date 2022/5/25 18:40
     */
    public static function delete(array $params)
    {
        Dept::destroy($params['id']);
    }


    /**
     * @notes 获取部门详情
     * @param $params
     * @return array
     * @author 段誉
     * @date 2022/5/25 18:40
     */
    public static function detail($params) : array
    {
        return Dept::findOrEmpty($params['id'])->toArray();
    }
}