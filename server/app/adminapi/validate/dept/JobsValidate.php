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
use app\common\model\auth\AdminJobs;
use app\common\model\dept\Jobs;
use app\common\validate\BaseValidate;



/**
 * 岗位验证
 * Class JobsValidate
 * @package app\adminapi\validate\dept
 */
class JobsValidate extends BaseValidate
{
    protected $rule = [
        'id' => 'require|checkJobs',
        'name' => 'require|unique:'.Jobs::class.'|length:1,50',
        'code' => 'require|unique:'.Jobs::class,
        'status' => 'require|in:0,1',
        'sort' => 'egt:0',
    ];

    protected $message = [
        'id.require' => '参数缺失',
        'name.require' => '请填写岗位名称',
        'name.length' => '岗位名称长度须在1-50位字符',
        'name.unique' => '岗位名称已存在',
        'code.require' => '请填写岗位编码',
        'code.unique' => '岗位编码已存在',
        'sort.egt' => '排序值不正确',
        'status.require' => '请选择岗位状态',
        'status.in' => '岗位状态值错误',
    ];


    /**
     * @notes 添加场景
     * @return JobsValidate
     * @author 段誉
     * @date 2022/5/26 9:53
     */
    public function sceneAdd()
    {
        return $this->remove('id', true);
    }


    /**
     * @notes 详情场景
     * @return JobsValidate
     * @author 段誉
     * @date 2022/5/26 9:53
     */
    public function sceneDetail()
    {
        return $this->only(['id']);
    }


    public function sceneEdit()
    {
    }


    /**
     * @notes 删除场景
     * @return JobsValidate
     * @author 段誉
     * @date 2022/5/26 9:54
     */
    public function sceneDelete()
    {
        return $this->only(['id'])->append('id', 'checkAbleDetele');
    }


    /**
     * @notes 校验岗位
     * @param $value
     * @return bool|string
     * @author 段誉
     * @date 2022/5/26 9:55
     */
    public function checkJobs($value)
    {
        $jobs = Jobs::findOrEmpty($value);
        if ($jobs->isEmpty()) {
            return '岗位不存在';
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
        $check = AdminJobs::where(['jobs_id' => $value])->findOrEmpty();
        if (!$check->isEmpty()) {
            return '已关联管理员，暂不可删除';
        }
        return true;
    }

}