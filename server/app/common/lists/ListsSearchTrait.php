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


namespace app\common\lists;


trait ListsSearchTrait
{

    protected array $params;
    protected $searchWhere = [];


    /**
     * @notes 搜索条件生成
     * @param $search
     * @return array
     * @author 令狐冲
     * @date 2021/7/7 19:36
     */
    private function createWhere($search)
    {
        if (empty($search)) {
            return [];
        }
        $where = [];
        foreach ($search as $whereType => $whereFields) {
            switch ($whereType) {
                case '=':
                case '<>':
                case '>':
                case '>=':
                case '<':
                case '<=':
                case 'in':
                    foreach ($whereFields as $whereField) {
                        $paramsName = substr_symbol_behind($whereField);
                        if (!isset($this->params[$paramsName]) || $this->params[$paramsName] == '') {
                            continue;
                        }
                        $where[] = [$whereField, $whereType, $this->params[$paramsName]];
                    }
                    break;
                case '%like%':
                    foreach ($whereFields as $whereField) {
                        $paramsName = substr_symbol_behind($whereField);
                        if (!isset($this->params[$paramsName]) || empty($this->params[$paramsName])) {
                            continue;
                        }
                        $where[] = [$whereField, 'like', '%' . $this->params[$paramsName] . '%'];
                    }
                    break;
                case '%like':
                    foreach ($whereFields as $whereField) {
                        $paramsName = substr_symbol_behind($whereField);
                        if (!isset($this->params[$paramsName]) || empty($this->params[$paramsName])) {
                            continue;
                        }
                        $where[] = [$whereField, 'like', '%' . $this->params[$paramsName]];
                    }
                    break;
                case 'like%':
                    foreach ($whereFields as $whereField) {
                        $paramsName = substr_symbol_behind($whereField);
                        if (!isset($this->params[$paramsName]) || empty($this->params[$paramsName])) {
                            continue;
                        }
                        $where[] = [$whereField, 'like', $this->params[$paramsName] . '%'];
                    }
                    break;
                case 'between_time':
                    if (!is_numeric($this->startTime) || !is_numeric($this->endTime)) {
                        break;
                    }
                    $where[] = [$whereFields, 'between', [$this->startTime, $this->endTime]];
                    break;
                case 'between':
                    if (empty($this->start) || empty($this->end)) {
                        break;
                    }
                    $where[] = [$whereFields, 'between', [$this->start, $this->end]];
                    break;
                case 'find_in_set': // find_in_set查询
                    foreach ($whereFields as $whereField) {
                        $paramsName = substr_symbol_behind($whereField);
                        if (!isset($this->params[$paramsName]) || $this->params[$paramsName] == '') {
                            continue;
                        }
                        $where[] = [$whereField, 'find in set', $this->params[$paramsName]];
                    }
                    break;
            }
        }
        return $where;
    }
}
