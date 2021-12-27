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

declare(strict_types=1);

namespace app\common\service;


use app\common\lists\BaseDataLists;
use app\common\lists\ListsExtendInterface;
use think\Response;
use think\response\Json;
use think\exception\HttpResponseException;

class JsonService
{

    /**
     * @notes 接口操作成功，返回信息
     * @param string $msg
     * @param array $data
     * @param int $code
     * @param int $show
     * @return Json
     * @author 段誉
     * @date 2021/12/24 18:28
     */
    public static function success(string $msg = 'success', array $data = [], int $code = 1, int $show = 1): Json
    {
        return self::result($code, $show, $msg, $data);
    }



    /**
     * @notes 接口操作失败，返回信息
     * @param string $msg
     * @param array $data
     * @param int $code
     * @param int $show
     * @return Json
     * @author 段誉
     * @date 2021/12/24 18:28
     */
    public static function fail(string $msg = 'fail', array $data = [], int $code = 0, int $show = 1): Json
    {
        return self::result($code, $show, $msg, $data);
    }



    /**
     * @notes 接口返回数据
     * @param $data
     * @return Json
     * @author 段誉
     * @date 2021/12/24 18:29
     */
    public static function data($data): Json
    {
        return self::success('', $data, 1, 0);
    }



    /**
     * @notes 接口返回信息
     * @param int $code
     * @param int $show
     * @param string $msg
     * @param array $data
     * @param int $httpStatus
     * @return Json
     * @author 段誉
     * @date 2021/12/24 18:29
     */
    private static function result(int $code, int $show, string $msg = 'OK', array $data = [], int $httpStatus = 200): Json
    {
        $result = compact('code', 'show', 'msg', 'data');
        return json($result, $httpStatus);
    }



    /**
     * @notes 抛出异常json
     * @param string $msg
     * @param array $data
     * @param int $code
     * @param int $show
     * @return Json
     * @author 段誉
     * @date 2021/12/24 18:29
     */
    public static function throw(string $msg = 'fail', array $data = [], int $code = 0, int $show = 1): Json
    {
        $data = compact('code', 'show', 'msg', 'data');
        $response = Response::create($data, 'json', 200);
        throw new HttpResponseException($response);
    }


    /**
     * @notes 数据列表
     * @param \app\common\lists\BaseDataLists $lists
     * @return \think\response\Json
     * @author 令狐冲
     * @date 2021/7/28 11:15
     */
    public static function dataLists(BaseDataLists $lists): Json
    {
        $data = [
            'lists' => $lists->lists(),
            'count' => $lists->count(),
            'page_no' => $lists->pageNo,
            'page_size' => $lists->pageSize,
        ];
        $data['extend'] = [];
        if ($lists instanceof ListsExtendInterface) {
            $data['extend'] = $lists->extend();
        }
        return self::success('', $data, 1, 0);
    }
}