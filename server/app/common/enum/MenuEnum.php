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

namespace app\common\enum;


class MenuEnum
{
    //商城页面
    const SHOP_PAGE = [
        [
            'index'     => 1,
            'name'      => '首页',
            'path'      => '/pages/index/index',
            'params'    => [],
            'type'      => 'shop',
        ],
    ];


    //菜单类型
    const NAVIGATION_HOME = 1;//首页导航
    const NAVIGATION_PERSONAL = 2;//个人中心

    //链接类型
    const LINK_SHOP = 1;//商城页面
    const LINK_CATEGORY = 2;//分类页面
    const LINK_CUSTOM = 3;//自定义链接

    /**
     * @notes 链接类型
     * @param bool $value
     * @return string|string[]
     * @author ljj
     * @date 2022/2/14 12:14 下午
     */
    public static function getLinkDesc($value = true)
    {
        $data = [
            self::LINK_SHOP => '商城页面',
            self::LINK_CATEGORY => '分类页面',
            self::LINK_CUSTOM => '自定义链接'
        ];
        if ($value === true) {
            return $data;
        }
        return $data[$value];
    }
}