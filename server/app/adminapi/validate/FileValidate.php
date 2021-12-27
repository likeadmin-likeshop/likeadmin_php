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

namespace app\adminapi\validate;


use app\common\validate\BaseValidate;

class FileValidate extends BaseValidate
{
    protected $rule = [
        'id'   => 'require|number',
        'cid'  => 'require|number',
        'ids'  => 'require|array',
        'type' => 'require|in:10,20,30',
        'pid'  => 'require|number',
        'name' => 'require'
    ];

    protected $message = [
        'id.require'   => '缺少id参数',
        'cid.require'  => '缺少cid参数',
        'ids.require'  => '缺少ids参数',
        'type.require' => '缺少type参数',
        'pid.require'  => '缺少pid参数',
        'name.require' => '缺少name参数',
    ];

    /**
     * @notes id验证场景
     * @return FileValidate
     * @author 张无忌
     * @date 2021/7/28 15:40
     */
    public function sceneId()
    {
        return $this->only(['id']);
    }

    /**
     * @notes 重命名文件场景
     * @author 张无忌
     * @date 2021/7/29 17:14
     */
    public function sceneRename()
    {
        return $this->only(['id', 'name']);
    }

    /**
     * @notes 新增分类场景
     * @return FileValidate
     * @author 张无忌
     * @date 2021/7/28 15:39
     */
    public function sceneAddCate()
    {
        return $this->only(['type', 'pid', 'name']);
    }

    /**
     * @notes 编辑分类场景
     * @return FileValidate
     * @author 张无忌
     * @date 2021/7/28 15:39
     */
    public function sceneEditCate()
    {
        return $this->only(['id', 'name']);
    }

    /**
     * @notes 移动场景
     * @return FileValidate
     * @author 张无忌
     * @date 2021/7/28 15:39
     */
    public function sceneMove()
    {
        return $this->only(['ids', 'cid']);
    }

    /**
     * @notes 删除场景
     * @return FileValidate
     * @author 张无忌
     * @date 2021/7/28 15:39
     */
    public function sceneDelete()
    {
        return $this->only(['ids']);
    }
}