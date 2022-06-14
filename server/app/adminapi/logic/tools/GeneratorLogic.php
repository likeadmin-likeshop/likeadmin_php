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

namespace app\adminapi\logic\tools;

use app\common\enum\GeneratorEnum;
use app\common\logic\BaseLogic;
use app\common\model\tools\GenerateColumn;
use app\common\model\tools\GenerateTable;
use think\facade\Db;


/**
 * 生成器逻辑
 * Class GeneratorLogic
 * @package app\adminapi\logic\tools
 */
class GeneratorLogic extends BaseLogic
{


    public static function getFieldType(string $type): string
    {
        if (0 === strpos($type, 'set') || 0 === strpos($type, 'enum')) {
            $result = 'string';
        } elseif (preg_match('/(double|float|decimal|real|numeric)/is', $type)) {
            $result = 'float';
        } elseif (preg_match('/(int|serial|bit)/is', $type)) {
            $result = 'int';
        } elseif (preg_match('/bool/is', $type)) {
            $result = 'bool';
        } elseif (0 === strpos($type, 'timestamp')) {
            $result = 'timestamp';
        } elseif (0 === strpos($type, 'datetime')) {
            $result = 'datetime';
        } elseif (0 === strpos($type, 'date')) {
            $result = 'date';
        } else {
            $result = 'string';
        }
        return $result;
    }


    // 选择数据表
    public static function selectTable($params)
    {
        Db::startTrans();
        try {
            $tablePrefix = config('database.connections.mysql.prefix');
            $defaultColumn = ['id', 'create_time', 'update_time', 'delete_time'];

            foreach ($params['table'] as $item) {
                // 添加主表基础信息
                $generateTable = self::initTable($item);

                // 添加数据表字段信息
                $tableName = str_replace($tablePrefix, '', $item['name']);
                $column = Db::name($tableName)->getFields();

                $insertColumn = [];
                foreach ($column as $value) {
                    $columnData = [
                        'table_id' => $generateTable['id'],
                        'column_name' => $value['name'],
                        'column_comment' => $value['comment'],
                        'column_type' => self::getFieldType($value['type']),
                        'is_null' => $value['notnull'] ? 0 : 1,
                        'is_pk' => $value['primary'] ? 1 : 0,
                    ];

                    if (!in_array($value['name'], $defaultColumn)) {
                        $columnData['is_insert'] = 1;
                        $columnData['is_update'] = 1;
                        $columnData['is_lists'] = 1;
                        $columnData['is_query'] = 1;
                    }
                    $insertColumn[] = $columnData;
                }
                (new GenerateColumn())->saveAll($insertColumn);
            }
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            self::$error = $e->getMessage();
            return false;
        }
    }

    public static function initTable($tableData)
    {
        return GenerateTable::create([
            'table_name' => $tableData['name'],
            'table_comment' => $tableData['comment'],
            'template_type' => GeneratorEnum::TEMPLATE_TYPE_SINGLE,
            'generate_type' => GeneratorEnum::GENERATE_TYPE_ZIP,
            'module_name' => 'adminapi'
        ]);
    }

    public static function initTableColumn()
    {

    }
}