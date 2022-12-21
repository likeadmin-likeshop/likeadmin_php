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

use app\common\enum\GeneratorEnum;
use app\common\model\BaseModel;


/**
 * 代码生成器-数据表信息模型
 * Class GenerateTable
 * @package app\common\model\tools
 */
class GenerateTable extends BaseModel
{

    protected $json = ['menu', 'tree', 'relations', 'delete'];

    protected $jsonAssoc = true;

    /**
     * @notes 关联数据表字段
     * @return \think\model\relation\HasMany
     * @author 段誉
     * @date 2022/6/15 10:46
     */
    public function tableColumn()
    {
        return $this->hasMany(GenerateColumn::class, 'table_id', 'id');
    }

    /**
     * @notes 模板类型描述
     * @param $value
     * @param $data
     * @return string|string[]
     * @author 段誉
     * @date 2022/6/14 11:25
     */
    public function getTemplateTypeDescAttr($value, $data)
    {
        return GeneratorEnum::getTemplateTypeDesc($data['template_type']);
    }



}