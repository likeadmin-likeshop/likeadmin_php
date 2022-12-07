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

namespace app\adminapi\validate\dept;

use app\common\model\auth\Admin;
use app\common\model\auth\AdminDept;
use app\common\model\dept\Dept;
use app\common\validate\BaseValidate;


/**
 * 部门验证器
 * Class DeptValidate
 * @package app\adminapi\validate\dept
 */
class DeptValidate extends BaseValidate
{

    protected $rule = [
        'id' => 'require|checkDept',
        'pid' => 'require|integer',
        'name' => 'require|unique:'.Dept::class.'|length:1,30',
        'status' => 'require|in:0,1',
        'sort' => 'egt:0',
    ];


    protected $message = [
        'id.require' => '参数缺失',
        'name.require' => '请填写部门名称',
        'name.length' => '部门名称长度须在1-30位字符',
        'name.unique' => '部门名称已存在',
        'sort.egt' => '排序值不正确',
        'pid.require' => '请选择上级部门',
        'pid.integer' => '上级部门参数错误',
        'status.require' => '请选择部门状态',
    ];


    /**
     * @notes 添加场景
     * @return DeptValidate
     * @author 段誉
     * @date 2022/5/25 18:16
     */
    public function sceneAdd()
    {
        return $this->remove('id', true)->append('pid', 'checkDept');
    }


    /**
     * @notes 详情场景
     * @return DeptValidate
     * @author 段誉
     * @date 2022/5/25 18:16
     */
    public function sceneDetail()
    {
        return $this->only(['id']);
    }


    /**
     * @notes 编辑场景
     * @return DeptValidate
     * @author 段誉
     * @date 2022/5/26 18:42
     */
    public function sceneEdit()
    {
        return $this->append('pid', 'checkPid');
    }


    /**
     * @notes 删除场景
     * @return DeptValidate
     * @author 段誉
     * @date 2022/5/25 18:16
     */
    public function sceneDelete()
    {
        return $this->only(['id'])->append('id', 'checkAbleDetele');
    }


    /**
     * @notes 校验部门
     * @param $value
     * @return bool|string
     * @author 段誉
     * @date 2022/5/25 18:17
     */
    public function checkDept($value)
    {
        $dept = Dept::findOrEmpty($value);
        if ($dept->isEmpty()) {
            return '部门不存在';
        }
        return true;
    }


    /**
     * @notes 校验能否删除
     * @param $value
     * @return bool|string
     * @author 段誉
     * @date 2022/5/26 14:22
     */
    public function checkAbleDetele($value)
    {
        $hasLower = Dept::where(['pid' => $value])->findOrEmpty();
        if (!$hasLower->isEmpty()) {
            return '已关联下级部门,暂不可删除';
        }

        $check = AdminDept::where(['dept_id' => $value])->findOrEmpty();
        if (!$check->isEmpty()) {
            return '已关联管理员，暂不可删除';
        }

        $dept = Dept::findOrEmpty($value);
        if ($dept['pid'] == 0) {
            return '顶级部门不可删除';
        }

        return true;
    }

    /**
     * @notes 校验部门
     * @param $value
     * @param $rule
     * @param array $data
     * @return bool|string
     * @author 段誉
     * @date 2022/5/26 18:41
     */
    public function checkPid($value, $rule, $data = [])
    {
        // 当前编辑的部门id信息是否存在
        $dept = Dept::findOrEmpty($data['id']);
        if ($dept->isEmpty()) {
            return '当前部门信息缺失';
        }

        // 顶级部门不校验上级部门id
        if ($dept['pid'] == 0) {
            return true;
        }

        if ($data['id'] == $value) {
            return '上级部门不可是当前部门';
        }

        $leaderDept = Dept::findOrEmpty($value);
        if ($leaderDept->isEmpty()) {
            return '部门不存在';
        }

        return true;
    }


}