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


use app\common\enum\DecoratePageEnum;
use app\common\logic\BaseLogic;


/**
 * 装修页面
 * Class DecoratePageLogic
 * @package app\adminapi\logic\theme
 */
class DecoratePageLogic extends BaseLogic
{

    /**
     * @notes 获取装修页面链接
     * @param string $type
     * @return array
     * @author 段誉
     * @date 2022/9/6 14:29
     */
    public static function getPageLink(string $type): array
    {
        $pageList = DecoratePageEnum::CLIENT_PAGE;
        $list = [];
        foreach ($pageList as $page) {
            if ($type === $page['type']) {
                $list[] = $page;
            }
        }
        return $list;
    }


}