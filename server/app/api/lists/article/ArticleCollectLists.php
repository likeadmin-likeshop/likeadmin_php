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

namespace app\api\lists\article;

use app\api\lists\BaseApiDataLists;
use app\common\enum\YesNoEnum;
use app\common\model\article\Article;

/**
 * 文章收藏列表
 * Class ArticleCollectLists
 * @package app\api\lists\article
 */
class ArticleCollectLists extends BaseApiDataLists
{

    /**
     * @notes 获取收藏列表
     * @return array
     * @author 段誉
     * @date 2022/9/20 16:29
     */
    public function lists(): array
    {
        $field = "c.id,c.article_id,a.title,a.image,a.desc,
        a.click_virtual + a.click_actual as click,a.create_time";

        return (new Article())->alias('a')
            ->join('article_collect c', 'c.article_id = a.id')
            ->field($field)
            ->where(['c.user_id' => $this->userId, 'c.status' => YesNoEnum::YES])
            ->order(['sort' => 'desc', 'c.id' => 'desc'])
            ->limit($this->limitOffset, $this->limitLength)
            ->select()->toArray();
    }


    /**
     * @notes 获取收藏数量
     * @return int
     * @author 段誉
     * @date 2022/9/20 16:29
     */
    public function count(): int
    {
        return (new Article())->alias('a')
            ->join('article_collect c', 'c.article_id = a.id')
            ->where(['c.user_id' => $this->userId, 'c.status' => YesNoEnum::YES])
            ->count();
    }
}