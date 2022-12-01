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

namespace app\adminapi\lists\auth;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsExcelInterface;
use app\common\lists\ListsExtendInterface;
use app\common\lists\ListsSearchInterface;
use app\common\lists\ListsSortInterface;
use app\common\model\auth\Admin;
use app\common\model\auth\AdminRole;
use app\common\model\auth\SystemRole;
use app\common\model\dept\Dept;
use app\common\model\dept\Jobs;

/**
 * 管理员列表
 * Class AdminLists
 * @package app\adminapi\lists\auth
 */
class AdminLists extends BaseAdminDataLists implements ListsExtendInterface, ListsSearchInterface, ListsSortInterface,ListsExcelInterface
{
    /**
     * @notes 设置导出字段
     * @return string[]
     * @author 段誉
     * @date 2021/12/29 10:08
     */
    public function setExcelFields(): array
    {
        return [
            'account' => '账号',
            'name' => '名称',
            'role_name' => '角色',
            'dept_name' => '部门',
            'create_time' => '创建时间',
            'login_time' => '最近登录时间',
            'login_ip' => '最近登录IP',
            'disable_desc' => '状态',
        ];
    }


    /**
     * @notes 设置导出文件名
     * @return string
     * @author 段誉
     * @date 2021/12/29 10:08
     */
    public function setFileName(): string
    {
        return '管理员列表';
    }


    /**
     * @notes 设置搜索条件
     * @return \string[][]
     * @author 段誉
     * @date 2021/12/29 10:07
     */
    public function setSearch(): array
    {
        return [
            '%like%' => ['name', 'account'],
        ];
    }


    /**
     * @notes 设置支持排序字段
     * @return string[]
     * @author 段誉
     * @date 2021/12/29 10:07
     * @remark 格式: ['前端传过来的字段名' => '数据库中的字段名'];
     */
    public function setSortFields(): array
    {
        return ['create_time' => 'create_time', 'id' => 'id'];
    }


    /**
     * @notes 设置默认排序
     * @return string[]
     * @author 段誉
     * @date 2021/12/29 10:06
     */
    public function setDefaultOrder(): array
    {
        return ['id' => 'desc'];
    }

    /**
     * @notes 查询条件
     * @return array
     * @author 段誉
     * @date 2022/11/29 11:33
     */
    public function queryWhere()
    {
        $where = [];
        if (isset($this->params['role_id']) && $this->params['role_id'] != '') {
            $adminIds = AdminRole::where('role_id', $this->params['role_id'])->column('admin_id');
            if (!empty($adminIds)) {
                $where[] = ['id', 'in', $adminIds];
            }
        }
        return $where;
    }


    /**
     * @notes 获取管理列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2021/12/29 10:05
     */
    public function lists(): array
    {
        $field = [
            'id', 'name', 'account', 'create_time', 'disable', 'root',
            'login_time', 'login_ip', 'multipoint_login', 'avatar'
        ];

        $adminLists = Admin::field($field)
            ->where($this->searchWhere)
            ->where($this->queryWhere())
            ->limit($this->limitOffset, $this->limitLength)
            ->order($this->sortOrder)
            ->append(['role_id', 'dept_id', 'jobs_id', 'disable_desc'])
            ->select()
            ->toArray();

        // 角色数组（'角色id'=>'角色名称')
        $roleLists = SystemRole::column('name', 'id');
        // 部门列表
        $deptLists = Dept::column('name', 'id');
        // 岗位列表
        $jobsLists = Jobs::column('name', 'id');

        //管理员列表增加角色名称
        foreach ($adminLists as $k => $v) {
            $roleName = '';
            if ($v['root'] == 1) {
                $roleName = '系统管理员';
            } else {
                foreach ($v['role_id'] as $roleId) {
                    $roleName .= $roleLists[$roleId] ?? '';
                    $roleName .= '/';
                }
            }

            $deptName = '';
            foreach ($v['dept_id'] as $deptId) {
                $deptName .= $deptLists[$deptId] ?? '';
                $deptName .= '/';
            }

            $jobsName = '';
            foreach ($v['jobs_id'] as $jobsId) {
                $jobsName .= $jobsLists[$jobsId] ?? '';
                $jobsName .= '/';
            }

            $adminLists[$k]['role_name'] = trim($roleName, '/');
            $adminLists[$k]['dept_name'] = trim($deptName, '/');
            $adminLists[$k]['jobs_name'] = trim($jobsName, '/');
        }

        return $adminLists;
    }

    /**
     * @notes 获取数量
     * @return int
     * @author 令狐冲
     * @date 2021/7/13 00:52
     */
    public function count(): int
    {
        return Admin::where($this->searchWhere)
            ->where($this->queryWhere())
            ->count();
    }

    public function extend()
    {
        return [];
    }
}