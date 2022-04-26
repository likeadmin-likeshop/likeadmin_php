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


use app\adminapi\lists\file\FileCateLists;
use app\adminapi\lists\file\FileLists;
use app\adminapi\logic\FileLogic;
use app\adminapi\validate\FileValidate;
use think\response\Json;

/**文件管理
 * Class FileController
 * @package app\adminapi\controller
 */
class FileController extends BaseAdminController
{

    /**
     * @notes 文件列表
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:30
     */
    public function lists()
    {
        return $this->dataLists(new FileLists());
    }


    /**
     * @notes 文件移动成功
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:30
     */
    public function move()
    {
        $params = (new FileValidate())->post()->goCheck('move');
        FileLogic::move($params);
        return $this->success('移动成功', [], 1, 1);
    }


    /**
     * @notes 重命名文件
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:31
     */
    public function rename()
    {
        $params = (new FileValidate())->post()->goCheck('rename');
        FileLogic::rename($params);
        return $this->success('重命名成功', [], 1, 1);
    }


    /**
     * @notes 删除文件
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:31
     */
    public function delete()
    {
        $params = (new FileValidate())->post()->goCheck('delete');
        FileLogic::delete($params);
        return $this->success('删除成功', [], 1, 1);
    }


    /**
     * @notes 分类列表
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:31
     */
    public function listCate()
    {
        return $this->dataLists(new FileCateLists());
    }


    /**
     * @notes 添加文件分类
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:31
     */
    public function addCate()
    {
        $params = (new FileValidate())->post()->goCheck('addCate');
        FileLogic::addCate($params);
        return $this->success('添加成功', [], 1, 1);
    }


    /**
     * @notes 编辑文件分类
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:31
     */
    public function editCate()
    {
        $params = (new FileValidate())->post()->goCheck('editCate');
        FileLogic::editCate($params);
        return $this->success('编辑成功', [], 1, 1);
    }


    /**
     * @notes 删除文件分类
     * @return Json
     * @author 段誉
     * @date 2021/12/29 14:32
     */
    public function delCate()
    {
        $params = (new FileValidate())->post()->goCheck('id');
        FileLogic::delCate($params);
        return $this->success('删除成功', [], 1, 1);
    }
}