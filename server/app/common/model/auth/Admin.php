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

namespace app\common\model\auth;

use app\common\enum\YesNoEnum;
use app\common\model\BaseModel;
use think\model\concern\SoftDelete;
use app\common\service\FileService;

class Admin extends BaseModel
{
    use SoftDelete;

    protected $deleteTime = 'delete_time';

    /**
     * @notes 关联角色模型
     * @date 2021/6/30 17:48
     * @return \think\model\relation\HasOne
     * @author lr
     */
    public function role()
    {
        return $this->hasOne('role', 'id', 'role_id')
            ->field('id,name');
    }

    public function roleAuthIndex()
    {
        return $this->hasMany(RoleAuthIndex::class,'role_id','role_id');
    }

    /**
     * @notes 获取禁用状态
     * @param $value
     * @param $data
     * @return string|string[]
     * @author 令狐冲
     * @date 2021/7/7 01:25
     */
    public function getDisableDescAttr($value, $data)
    {
        return YesNoEnum::getDisableDesc($data['disable']);
    }

    /**
     * @notes 最后登录时间获取器 - 格式化：年-月-日 时:分:秒
     * @param $value
     * @return string
     * @author Tab
     * @date 2021/7/13 11:35
     */
    public function getLoginTimeAttr($value)
    {
        return empty($value) ? '' : date('Y-m-d H:i:s', $value);
    }

    /**
     * @notes 头像获取器 - 头像路径添加域名
     * @param $value
     * @return string
     * @author Tab
     * @date 2021/7/13 11:35
     */
    public function getAvatarAttr($value)
    {
        return empty($value) ? FileService::getFileUrl(config('project.default_image.admin_avatar')) : FileService::getFileUrl(trim($value, '/'));
    }
}