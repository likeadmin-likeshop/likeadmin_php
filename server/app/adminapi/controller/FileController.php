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
     * @author 张无忌
     * @date 2021/7/28 14:52
     */
    public function lists()
    {
        return $this->dataLists(new FileLists());
    }

    /**
     * @notes 移动成功
     * @return Json
     * @author 张无忌
     * @date 2021/7/28 15:33
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
     * @author 张无忌
     * @date 2021/7/29 17:17
     */
    public function rename()
    {
        $params = (new FileValidate())->post()->goCheck('rename');
        FileLogic::rename($params);
        return $this->success('重命名成功', [], 1, 1);
    }

    /**
     * @notes 删除文件
     * @author 张无忌
     * @date 2021/7/28 15:40
     */
    public function delete()
    {
        $params = (new FileValidate())->post()->goCheck('delete');
        FileLogic::delete($params);
        return $this->success('删除成功', [], 1, 1);
    }

    /**
     * @notes 分类列表
     * @author 张无忌
     * @date 2021/7/28 18:34
     */
    public function listCate()
    {
        return $this->dataLists(new FileCateLists());
    }

    /**
     * @notes 添加文件分类
     * @return Json
     * @author 张无忌
     * @date 2021/7/28 14:02
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
     * @author 张无忌
     * @date 2021/7/28 14:16
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
     * @author 张无忌
     * @date 2021/7/28 14:50
     */
    public function delCate()
    {
        $params = (new FileValidate())->post()->goCheck('id');
        FileLogic::delCate($params);
        return $this->success('删除成功', [], 1, 1);
    }
}