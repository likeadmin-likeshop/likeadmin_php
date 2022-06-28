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

namespace app\common\model\tools;


use app\common\model\BaseModel;


/**
 * 代码生成器-数据表字段信息模型
 * Class GenerateColumn
 * @package app\common\model\tools
 */
class GenerateColumn extends BaseModel
{

    /**
     * @notes 关联table表
     * @return \think\model\relation\BelongsTo
     * @author 段誉
     * @date 2022/6/15 18:59
     */
    public function generateTable()
    {
        return $this->belongsTo(GenerateTable::class, 'id', 'table_id');
    }
}