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

namespace app\adminapi\logic;


use app\common\logic\BaseLogic;
use app\common\service\FileService;


/**
 * 工作台
 * Class WorkbenchLogic
 * @package app\adminapi\logic
 */
class WorkbenchLogic extends BaseLogic
{
    /**
     * @notes 工作套
     * @param $adminInfo
     * @return array
     * @author 段誉
     * @date 2021/12/29 15:58
     */
    public static function index()
    {
        return [
            // 版本信息
            'version' => self::versionInfo(),
            // 今日数据
            'today' => self::today(),
            // 常用功能
            'menu' => self::menu(),
            // 近15日访客数
            'visitor' => self::visitor(),
            // 文章阅读量排名
            'article' => self::article()
        ];
    }


    /**
     * @notes 常用功能
     * @return array[]
     * @author 段誉
     * @date 2021/12/29 16:40
     */
    public static function menu() : array
    {
        return [
            [
                'name' => '工作台',
                'image' => FileService::getFileUrl(config('project.default_image.admin_avatar')),
                'url' => '/workbench'
            ],
            [
                'name' => '网站信息',
                'image' => FileService::getFileUrl(config('project.default_image.admin_avatar')),
                'url' => '/setting/website/information'
            ],
            [
                'name' => '系统环境',
                'image' => FileService::getFileUrl(config('project.default_image.admin_avatar')),
                'url' => '/setting/website/environment'
            ],
        ];
    }


    /**
     * @notes 版本信息
     * @return array
     * @author 段誉
     * @date 2021/12/29 16:08
     */
    public static function versionInfo() : array
    {
        return [
            'version' => config('project.version'),
            'website' => config('project.website.url'),
            'name' => config('project.website.name'),
        ];
    }


    /**
     * @notes 今日数据
     * @return int[]
     * @author 段誉
     * @date 2021/12/29 16:15
     */
    public static function today() : array
    {
        return [
            'time' => date('Y-m-d H:i:s'),
            // 今日销售额
            'today_sales' => 100,
            // 总销售额
            'total_sales' => 1000,

            // 今日访问量
            'today_visitor' => 10,
            // 总访问量
            'total_visitor' => 100,

            // 今日新增用户量
            'today_new_user' => 30,
            // 总用户量
            'total_new_user' => 3000,
        ];
    }


    /**
     * @notes 文章阅读排名
     * @return array[]
     * @author 段誉
     * @date 2021/12/29 16:40
     */
    public static function article() : array
    {
        return [
            ['name' => '文章1', 'read' => 1000],
            ['name' => '文章2', 'read' => 800],
            ['name' => '文章3', 'read' => 600],
            ['name' => '文章4', 'read' => 400],
        ];
    }


    /**
     * @notes 访问数
     * @return array
     * @author 段誉
     * @date 2021/12/29 16:57
     */
    public static function visitor() : array
    {
        $num = [];
        $date = [];
        for($i = 0; $i < 15; $i ++) {
            $where_start = strtotime("- ".$i."day");
            $date[] = date('Y/m/d',$where_start);
            $num[$i] = rand(0, 100);
        }

        return [
            'date' => $date,
            'list' => [
                ['name' => '访客数', 'data' => $num]
            ]
        ];
    }

}