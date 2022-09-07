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


namespace app\common\model\user;


use app\common\enum\user\UserEnum;
use app\common\model\BaseModel;
use app\common\service\ConfigService;
use app\common\service\FileService;
use think\model\concern\SoftDelete;

/**
 * 用户模型
 * Class User
 * @package app\common\model\user
 */
class User extends BaseModel
{
    use SoftDelete;

    protected $deleteTime = 'delete_time';


    //用户信息搜索
    public function searchKeywordAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('sn|nickname|mobile', 'like', '%' . $value . '%');
        }
    }


    //注册来源
    public function searchSourceAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('register_source', '=', $value);
        }
    }


    //注册时间筛选
    public function searchCreateStartTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('create_time', '>=', $value);
        }
    }

    //注册时间筛选
    public function searchCreateEndTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('create_time', '<=', $value);
        }
    }

    //禁用状态搜索
    public function searchDisableAttr($query, $value, $data)
    {
        if (in_array($value, [0, 1])) {
            $query->where('disable', '=', $value);
        }
    }

    //关联用户授权模型
    public function userAuth()
    {
        return $this->hasOne(UserAuth::class, 'user_id');
    }


    /**
     * @notes 头像获取器 - 用于头像地址拼接域名
     * @param $value
     * @return string
     * @author Tab
     * @date 2021/7/17 14:28
     */
    public function getAvatarAttr($value)
    {
        return trim($value) ? FileService::getFileUrl($value) : '';
    }


    //最后登录时间格式化
    public function getLoginTimeAttr($value)
    {
        return $value ? date('Y-m-d H:i:s', $value) : '';
    }


    /**
     * @notes 获取器-性别描述
     * @param $value
     * @param $data
     * @return string|string[]
     * @author 段誉
     * @date 2022/9/7 15:15
     */
    public function getSexAttr($value, $data)
    {
        return UserEnum::getSexDesc($value);
    }


}