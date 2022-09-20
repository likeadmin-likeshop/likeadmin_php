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
use app\common\model\article\ArticleCate;

/**
 * 文章分类列表
 * Class ArticleCateLists
 * @package app\api\lists\article
 */
class ArticleCateLists extends BaseApiDataLists
{

    /**
     * @notes 获取文章分类列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/16 18:53
     */
    public function lists(): array
    {
        return ArticleCate::field('id,name')
            ->where('is_show', '=', 1)
            ->order(['sort' => 'desc', 'id' => 'desc'])
            ->select()->toArray();
    }


    /**
     * @notes 获取文章分类数量
     * @return int
     * @author 段誉
     * @date 2022/9/16 18:54
     */
    public function count(): int
    {
        return ArticleCate::where('is_show', '=', 1)->count();
    }
}