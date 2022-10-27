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

namespace app\api\logic;

use app\common\enum\YesNoEnum;
use app\common\logic\BaseLogic;
use app\common\model\article\Article;
use app\common\model\article\ArticleCate;
use app\common\model\article\ArticleCollect;


/**
 * 文章逻辑
 * Class ArticleLogic
 * @package app\api\logic
 */
class ArticleLogic extends BaseLogic
{

    /**
     * @notes 文章详情
     * @param $articleId
     * @param $userId
     * @return array
     * @author 段誉
     * @date 2022/9/20 17:09
     */
    public static function detail($articleId, $userId)
    {
        // 文章详情
        $article = Article::getArticleDetailArr($articleId);
        // 关注状态
        $article['collect'] = ArticleCollect::isCollectArticle($userId, $articleId);

        return $article;
    }


    /**
     * @notes 加入收藏
     * @param $userId
     * @param $articleId
     * @author 段誉
     * @date 2022/9/20 16:52
     */
    public static function addCollect($articleId, $userId)
    {
        $where = ['user_id' => $userId, 'article_id' => $articleId];
        $collect = ArticleCollect::where($where)->findOrEmpty();
        if ($collect->isEmpty()) {
            ArticleCollect::create([
                'user_id' => $userId,
                'article_id' => $articleId,
                'status' => YesNoEnum::YES
            ]);
        } else {
            ArticleCollect::update([
                'id' => $collect['id'],
                'status' => YesNoEnum::YES
            ]);
        }
    }


    /**
     * @notes 取消收藏
     * @param $articleId
     * @param $userId
     * @author 段誉
     * @date 2022/9/20 16:59
     */
    public static function cancelCollect($articleId, $userId)
    {
        ArticleCollect::update(['status' => YesNoEnum::NO], [
            'user_id' => $userId,
            'article_id' => $articleId,
            'status' => YesNoEnum::YES
        ]);
    }


    /**
     * @notes 文章分类
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/23 14:11
     */
    public static function cate()
    {
        return ArticleCate::field('id,name')
            ->where('is_show', '=', 1)
            ->order(['sort' => 'desc', 'id' => 'desc'])
            ->select()->toArray();
    }

}