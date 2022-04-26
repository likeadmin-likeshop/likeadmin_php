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

namespace app\adminapi\validate\ad;

use app\common\enum\DefaultEnum;
use app\common\model\ad\Ad;
use app\common\model\ad\AdPosition;
use app\common\validate\BaseValidate;

/**
 * 广告位置验证
 * Class AdPositionValidate
 * @package app\adminapi\validate\ad
 */
class AdPositionValidate extends BaseValidate
{
    protected $rule = [
        'id' => 'require|checkId',
        'name' => 'require|checkName',
        'status' => 'require|in:0,1'
    ];

    protected $message = [
        'id.require' => '参数错误',
        'name.require' => '请输入广告位名称',
        'status.require' => '请选择广告位状态',
        'status.in' => '广告位状态取值范围在[0,1]',
    ];

    public function sceneAdd()
    {
        return $this->only(['name','status']);
    }

    public function sceneDetail()
    {
        return $this->only(['id']);
    }

    public function sceneEdit()
    {
        return $this->only(['id','name','status']);
    }

    public function sceneDel()
    {
        return $this->only(['id'])
            ->append('id','checkDel');
    }

    public function sceneStatus()
    {
        return $this->only(['id','status']);
    }


    /**
     * @notes 检验广告位id
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/14 5:00 下午
     */
    public function checkId($value,$rule,$data)
    {
        $result = AdPosition::where('id',$value)->findOrEmpty();
        if ($result->isEmpty()) {
            return '广告位不存在';
        }
        return true;
    }

    /**
     * @notes 检验广告位名称
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/14 5:02 下午
     */
    public function checkName($value,$rule,$data)
    {
        $where[] = ['name','=',$value];
        if (isset($data['id'])) {
            $where[] = ['id','<>',$data['id']];
        }
        $result = AdPosition::where($where)->findOrEmpty();
        if (!$result->isEmpty()) {
            return '广告位名称已存在，请重新输入';
        }
        return true;
    }

    /**
     * @notes 检验广告位能否删除
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/2/14 5:27 下午
     */
    public function checkDel($value,$rule,$data)
    {
        $result = AdPosition::where('id',$value)->findOrEmpty()->toArray();
        if ($result['attr'] == DefaultEnum::SYSTEM) {
            return '系统默认广告位，无法删除';
        }
        $result = Ad::where('pid',$value)->select()->toArray();
        if ($result) {
            return '广告位正在使用中，无法删除';
        }
        return true;
    }
}