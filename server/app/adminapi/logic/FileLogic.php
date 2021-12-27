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
use app\common\model\file\File;
use app\common\model\file\FileCate;

/**
 * 文件逻辑层
 * Class FileLogic
 * @package app\adminapi\logic
 */
class FileLogic extends BaseLogic
{
    /**
     * @notes 移动文件
     * @param $params
     * @author 张无忌
     * @date 2021/7/28 15:29
     */
    public static function move($params)
    {
        (new File())->whereIn('id', $params['ids'])
            ->update([
                'cid' => $params['cid'],
                'update_time' => time()
            ]);
    }

    /**
     * @notes 重命名文件
     * @param $params
     * @author 张无忌
     * @date 2021/7/29 17:16
     */
    public static function rename($params)
    {
        (new File())->where('id', $params['id'])
            ->update([
                'name' => $params['name'],
                'update_time' => time()
            ]);
    }

    /**
     * @notes 批量删除文件
     * @param $params
     * @author 张无忌
     * @date 2021/7/28 15:41
     */
    public static function delete($params)
    {
        File::destroy($params['ids']);
    }

    /**
     * @notes 添加文件分类
     * @param $params
     * @author 张无忌
     * @date 2021/7/28 11:32
     */
    public static function addCate($params)
    {
        FileCate::create([
            'type' => $params['type'],
            'pid' => $params['pid'],
            'name' => $params['name']
        ]);
    }

    /**
     * @notes 编辑文件分类
     * @param $params
     * @author 张无忌
     * @date 2021/7/28 14:03
     */
    public static function editCate($params)
    {
        FileCate::update([
            'name' => $params['name'],
            'update_time' => time()
        ], ['id' => $params['id']]);
    }

    /**
     * @notes 删除文件分类
     * @param $params
     * @author 张无忌
     * @date 2021/7/28 14:21
     */
    public static function delCate($params)
    {
        FileCate::destroy($params['id']);
    }
}