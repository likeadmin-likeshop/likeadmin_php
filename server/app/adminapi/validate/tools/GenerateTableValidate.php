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

namespace app\adminapi\validate\tools;


use app\common\validate\BaseValidate;
use think\facade\Db;


/**
 * 代码生成选择表验证
 * Class SelectTableValidate
 * @package app\adminapi\validate\tools
 */
class GenerateTableValidate extends BaseValidate
{

    protected $rule = [
        'id' => 'require',
        'table' => 'require|array|checkTable',
    ];

    protected $message = [
        'id.require' => '参数缺失',
        'table.require' => '参数缺失',
        'table.array' => '参数类型错误',
    ];


    public function sceneSelect()
    {
        return $this->only(['table']);
    }


    public function sceneDetail()
    {
        return $this->only(['id']);
    }


    protected function checkTable($value, $rule, $data)
    {
        foreach ($value as $item) {
            $exist = Db::query("SHOW TABLES LIKE'" . $item['name'] . "'");
            if (empty($exist)) {
                return '当前数据库不存在' . $item['name'] . '表';
            }
        }
        return true;
    }


}