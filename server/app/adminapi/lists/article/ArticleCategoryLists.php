<?php
// +----------------------------------------------------------------------
// | likeshop100%开源免费商用商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshopTeam
// +----------------------------------------------------------------------

namespace app\adminapi\lists\article;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\lists\ListsSortInterface;
use app\common\model\article\ArticleCategory;

/**
 * 资讯分类列表
 * Class ArticleCategoryLists
 * @package app\adminapi\lists\article
 */
class ArticleCategoryLists extends BaseAdminDataLists implements ListsSearchInterface, ListsSortInterface
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
        return ['id' => 'desc'];
    }

    /**
     * @notes  获取管理列表
     * @return array
     * @author heshihu
     * @date 2022/2/21 17:11
     */
    public function lists(): array
    {
        $ArticleCategoryLists = ArticleCategory::where($this->searchWhere)
            ->append(['is_show_desc'])
            ->limit($this->limitOffset, $this->limitLength)
            ->order($this->sortOrder)
            ->select()
            ->toArray();

        return $ArticleCategoryLists;
    }

    /**
     * @notes  获取数量
     * @return int
     * @author heshihu
     * @date 2022/2/9 15:12
     */
    public function count(): int
    {
        return ArticleCategory::where($this->searchWhere)->count();
    }

    public function extend()
    {
        return [];
    }
}