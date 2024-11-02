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

namespace app\adminapi\controller;


use app\common\service\UploadService;
use Exception;
use think\response\Json;

/**
 * 上传文件
 * Class UploadController
 * @package app\adminapi\controller
 */
class UploadController extends BaseAdminController
{
    /**
     * @notes 上传图片
     * @return Json
     * @author 段誉
     * @date 2021/12/29 16:27
     */
    public function image()
    {
        try {
            $cid = $this->request->post('cid', 0);
            $result = UploadService::image($cid);
            return $this->success('上传成功', $result);
        } catch (Exception $e) {
            return $this->fail($e->getMessage());
        }
    }

    /**
     * @notes 上传视频
     * @return Json
     * @author 段誉
     * @date 2021/12/29 16:27
     */
    public function video()
    {
        try {
            $cid = $this->request->post('cid', 0);
            $result = UploadService::video($cid);
            return $this->success('上传成功', $result);
        } catch (Exception $e) {
            return $this->fail($e->getMessage());
        }
    }

    /**
     * @notes 上传文件
     * @return Json
     * @author dw
     * @date 2023/06/26
     */
    public function file()
    {
        try {
            $cid = $this->request->post('cid', 0);
            $result = UploadService::file($cid);
            return $this->success('上传成功', $result);
        } catch (Exception $e) {
            return $this->fail($e->getMessage());
        }
    }

}
