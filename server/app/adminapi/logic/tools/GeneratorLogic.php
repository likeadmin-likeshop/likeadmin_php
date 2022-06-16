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

    // 代码生成表详情
    public static function getTableDetail($params): array
    {
        return GenerateTable::with('table_column')
            ->findOrEmpty((int)$params['id'])
            ->toArray();
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
                // 添加表字段信息
                self::initTableColumn($column, $generateTable['id'], $defaultColumn);
            }

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            self::$error = $e->getMessage();
            return false;
        }
    }


    // 更新表信息
    public static function editTable($params)
    {
        Db::startTrans();
        try {
            // 更新主表-数据表信息
            GenerateTable::update([
                'id' => $params['id'],
                'table_name' => $params['table_name'],
                'table_comment' => $params['table_comment'],
                'template_type' => $params['template_type'],
                'author' => $params['author'] ?? '',
                'remark' => $params['remark'] ?? '',
                'generate_type' => $params['generate_type'],
                'module_name' => $params['module_name'],
                'class_name' => $params['class_name'] ?? '',
                'class_comment' => $params['class_comment'] ?? '',
            ]);

            // 更新从表-数据表字段信息
            foreach ($params['column'] as $item) {
                GenerateColumn::update([
                    'id' => $item['id'],
                    'column_comment' => $item['column_comment'],
                    'is_null' => $item['is_null'],
                    'is_pk' => $item['is_pk'],
                    'is_insert' => $item['is_insert'],
                    'is_update' => $item['is_update'],
                    'is_lists' => $item['is_lists'],
                    'is_query' => $item['is_query'],
                    'query_type' => $item['query_type'],
                    'view_type' => $item['view_type'],
                ]);
            }
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            self::$error = $e->getMessage();
            return false;
        }
    }


    /**
     * @notes 删除表相关信息
     * @param $params
     * @return bool
     * @author 段誉
     * @date 2022/6/16 9:30
     */
    public static function deleteTable($params)
    {
        Db::startTrans();
        try {
            GenerateTable::where(['id' => $params['id']])->delete();
            GenerateColumn::whereIn('table_id', $params['id'])->delete();
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            self::$error = $e->getMessage();
            return false;
        }
    }


    // 初始化代码生成数据表信息
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

    // 初始化代码生成字段信息
    public static function initTableColumn($column, $tableId, $defaultColumn)
    {
        $insertColumn = [];
        foreach ($column as $value) {
            $columnData = [
                'table_id' => $tableId,
                'column_name' => $value['name'],
                'column_comment' => $value['comment'],
                'column_type' => getDbFieldType($value['type']),
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
}