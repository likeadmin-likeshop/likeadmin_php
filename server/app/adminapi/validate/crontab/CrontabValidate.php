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

namespace app\adminapi\validate\crontab;

use app\common\validate\BaseValidate;
use Cron\CronExpression;

/**
 * 定时任务验证器
 * Class CrontabValidate
 * @package app\adminapi\validate\crontab
 */
class CrontabValidate extends BaseValidate
{
    protected $rule = [
        'name' => 'require',
        'type' => 'require|in:1',
        'command' => 'require',
        'status' => 'require|in:1,2,3',
        'expression' => 'require|checkExpression',
        'id' => 'require',
        'operate' => 'require'
    ];

    protected $message = [
        'name.require' => '请输入定时任务名称',
        'type.require' => '请选择类型',
        'type.in' => '类型值错误',
        'command.require' => '请输入命令',
        'status.require' => '请选择状态',
        'status.in' => '状态值错误',
        'expression.require' => '请输入运行规则',
        'id.require' => '参数缺失',
        'operate.require' => '请选择操作',
    ];


    /**
     * @notes 添加定时任务场景
     * @return CrontabValidate
     * @author 段誉
     * @date 2022/3/29 14:39
     */
    public function sceneAdd()
    {
        return $this->remove('id', 'require')->remove('operate', 'require');
    }


    /**
     * @notes 查看定时任务详情场景
     * @return CrontabValidate
     * @author 段誉
     * @date 2022/3/29 14:39
     */
    public function sceneDetail()
    {
        return $this->only(['id']);
    }


    /**
     * @notes 编辑定时任务
     * @return CrontabValidate
     * @author 段誉
     * @date 2022/3/29 14:39
     */
    public function sceneEdit()
    {
        return $this->remove('operate', 'require');
    }


    /**
     * @notes 删除定时任务场景
     * @return CrontabValidate
     * @author 段誉
     * @date 2022/3/29 14:40
     */
    public function sceneDelete()
    {
        return $this->only(['id']);
    }


    /**
     * @notes CrontabValidate
     * @return CrontabValidate
     * @author 段誉
     * @date 2022/3/29 14:40
     */
    public function sceneOperate()
    {
        return $this->only(['id', 'operate']);
    }


    /**
     * @notes 获取规则执行时间场景
     * @return CrontabValidate
     * @author 段誉
     * @date 2022/3/29 14:40
     */
    public function sceneExpression()
    {
        return $this->only(['expression']);
    }


    /**
     * @notes 校验运行规则
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author 段誉
     * @date 2022/3/29 14:40
     */
    public function checkExpression($value, $rule, $data)
    {
        if (CronExpression::isValidExpression($value) === false) {
            return '定时任务运行规则错误';
        }
        return true;
    }
}