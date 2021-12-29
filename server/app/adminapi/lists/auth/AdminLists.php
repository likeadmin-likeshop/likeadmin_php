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

namespace app\adminapi\lists\auth;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsExtendInterface;
use app\common\lists\ListsSearchInterface;
use app\common\lists\ListsSortInterface;
use app\common\model\auth\Admin;
use app\common\model\auth\Role;

/**
 * 管理员列表
 * Class AdminLists
 * @package app\adminapi\lists\auth
 */
class AdminLists extends BaseAdminDataLists implements ListsExtendInterface, ListsSearchInterface, ListsSortInterface
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
            'create_time' => '创建时间',
            'login_time' => '最后登录时间',
            'login_ip' => '最后登录IP',
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
            '=' => ['role_id']
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
            'id', 'name', 'account', 'role_id', 'create_time', 'disable',
            'login_time', 'login_ip', 'multipoint_login', 'avatar'
        ];

        $adminLists = Admin::field($field)
            ->where($this->searchWhere)
            ->append(['disable_desc'])
            ->limit($this->limitOffset, $this->limitLength)
            ->order($this->sortOrder)
            ->select()
            ->toArray();

        //获取角色数组（'角色id'=>'角色名称')
        $roleLists = Role::column('name', 'id');

        //管理员列表增加角色名称
        foreach ($adminLists as $k => $v) {
            $adminLists[$k]['role_name'] = $roleLists[$v['role_id']] ?? '';
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
        return Admin::where($this->searchWhere)->count();
    }

    public function extend()
    {
        return [];
    }
}