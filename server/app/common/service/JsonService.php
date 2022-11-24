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

declare(strict_types=1);

namespace app\common\service;


use app\common\enum\ExportEnum;
use app\common\lists\BaseDataLists;
use app\common\lists\ListsExcelInterface;
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
        //获取导出信息
        if ($lists->export == ExportEnum::INFO && $lists instanceof ListsExcelInterface) {
            return self::data($lists->excelInfo());
        }

        //获取导出文件的下载链接
        if ($lists->export == ExportEnum::EXPORT && $lists instanceof ListsExcelInterface) {
            $exportDownloadUrl = $lists->createExcel($lists->setExcelFields(), $lists->lists());
            return self::success('', ['url' => $exportDownloadUrl], 2);
        }

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