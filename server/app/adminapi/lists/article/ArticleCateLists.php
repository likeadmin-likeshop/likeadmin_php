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

namespace app\adminapi\lists\article;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\lists\ListsSortInterface;
use app\common\model\article\ArticleCate;

/**
 * 资讯分类列表
 * Class ArticleCateLists
 * @package app\adminapi\lists\article
 */
class ArticleCateLists extends BaseAdminDataLists implements ListsSearchInterface, ListsSortInterface
{


    /**
     * @notes  设置搜索条件
     * @return array
     * @author heshihu
     * @date 2022/2/8 18:39
     */
    public function setSearch(): array
    {
        return [];
    }

    /**
     * @notes  设置支持排序字段
     * @return array
     * @author heshihu
     * @date 2022/2/9 15:11
     */
    public function setSortFields(): array
    {
        return ['create_time' => 'create_time', 'id' => 'id'];
    }

    /**
     * @notes  设置默认排序
     * @return array
     * @author heshihu
     * @date 2022/2/9 15:08
     */
    public function setDefaultOrder(): array
    {
        return ['sort' => 'desc','id' => 'desc'];
    }

    /**
     * @notes  获取管理列表
     * @return array
     * @author heshihu
     * @date 2022/2/21 17:11
     */
    public function lists(): array
    {
        $ArticleCateLists = ArticleCate::where($this->searchWhere)
            ->append(['is_show_desc'])
            ->limit($this->limitOffset, $this->limitLength)
            ->order($this->sortOrder)
            ->append(['article_count'])
            ->select()
            ->toArray();

        return $ArticleCateLists;
    }

    /**
     * @notes  获取数量
     * @return int
     * @author heshihu
     * @date 2022/2/9 15:12
     */
    public function count(): int
    {
        return ArticleCate::where($this->searchWhere)->count();
    }

    public function extend()
    {
        return [];
    }
}