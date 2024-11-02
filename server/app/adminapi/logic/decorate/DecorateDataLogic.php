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
namespace app\adminapi\logic\decorate;

use app\common\logic\BaseLogic;
use app\common\model\article\Article;
use app\common\model\decorate\DecoratePage;

/**
 * 装修页-数据
 * Class DecorateDataLogic
 * @package app\adminapi\logic\decorate
 */
class DecorateDataLogic extends BaseLogic
{

    /**
     * @notes 获取文章列表
     * @param $limit
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/22 16:49
     */
    public static function getArticleLists($limit): array
    {
        $field = 'id,title,desc,abstract,image,author,content,
        click_virtual,click_actual,create_time';

        return Article::where(['is_show' => 1])
            ->field($field)
            ->order(['id' => 'desc'])
            ->limit($limit)
            ->append(['click'])
            ->hidden(['click_virtual', 'click_actual'])
            ->select()->toArray();
    }

    /**
     * @notes pc设置
     * @return array
     * @author mjf
     * @date 2024/3/14 18:13
     */
    public static function pc(): array
    {
        $pcPage = DecoratePage::findOrEmpty(4)->toArray();
        $updateTime = !empty($pcPage['update_time']) ? $pcPage['update_time'] : date('Y-m-d H:i:s');
        return [
            'update_time' => $updateTime,
            'pc_url' => request()->domain() . '/pc'
        ];
    }




}