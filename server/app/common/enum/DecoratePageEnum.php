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


/**
 * 装修页面枚举
 * Class DecoratePageEnum
 * @package app\common\enum
 */
class DecoratePageEnum
{
    //首页
    const HOME_PAGE = [
        'mobile' => '/pages/index/index',
        'pc' => '/',
    ];


    // 文章资讯
    const ARTICLE_PAGE = [
        'mobile' => '/pages/article/article',
    ];


    // 个人中心
    const USER_CENTRE_PAGE = [
        'mobile' => '/pages/user/user',
    ];


    // 联系客服
    const SERVICE_PAGE = [
        'mobile' => '/bundle/pages/service/service',
    ];


    // 我的收藏
    const MY_COLLECTION_PAGE = [
        'mobile' => '/bundle/pages/goods_collects/goods_collects',
    ];


    // 个人设置
    const USER_PROFILE_PAGE = [
        'mobile' => '/bundle/pages/user_profile/user_profile',
    ];


    // 隐私政策
    const PRIVACY_POLICY_PAGE = [
        'mobile' => '/bundle/pages/user_profile/user_profile',
    ];


    // 服务协议
    const SERVICE_AGREEMENT_PAGE = [
        'mobile' => '/bundle/pages/user_profile/user_profile',
    ];


    // 关于我们
    const ABOUT_AU_PAGE = [
        'mobile' => '/bundle/pages/user_profile/user_profile',
    ];


    // 个人资料
    const PERSONAL_DATA = [
        'mobile' => '/bundle/pages/user_profile/user_profile',
    ];



    // 客户端 页面路径
    const CLIENT_PAGE = [
        [
            'index' => 1,
            'name' => '商城首页',
            'path' => self::HOME_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 2,
            'name' => '文章资讯',
            'params' => [],
            'path' => self::ARTICLE_PAGE['mobile'],
            'type' => 'client',
        ],
        [
            'index' => 3,
            'name' => '个人中心',
            'path' => self::USER_CENTRE_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 4,
            'name' => '联系客服',
            'path' => self::SERVICE_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 5,
            'name' => '我的收藏',
            'path' => self::MY_COLLECTION_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 6,
            'name' => '个人设置',
            'path' => self::USER_PROFILE_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 7,
            'name' => '隐私政策',
            'path' => self::PRIVACY_POLICY_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 8,
            'name' => '服务协议',
            'path' => self::SERVICE_AGREEMENT_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 9,
            'name' => '关于我们',
            'path' => self::ABOUT_AU_PAGE['mobile'],
            'params' => [],
            'type' => 'client',
        ],
        [
            'index' => 10,
            'name' => '个人资料',
            'path' => self::PERSONAL_DATA['mobile'],
            'params' => [],
            'type' => 'client',
        ]
    ];


}