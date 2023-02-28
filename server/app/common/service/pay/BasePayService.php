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


namespace app\common\service\pay;


use think\facade\Log;

class BasePayService
{
    /**
     * 错误信息
     * @var string
     */
    protected $error;

    /**
     * 返回状态码
     * @var int
     */
    protected $returnCode = 0;


    /**
     * @notes 获取错误信息
     * @return string
     * @author 段誉
     * @date 2021/7/21 18:23
     */
    public function getError()
    {
        if (false === self::hasError()) {
            return '系统错误';
        }
        return $this->error;
    }


    /**
     * @notes 设置错误信息
     * @param $error
     * @author 段誉
     * @date 2021/7/21 18:20
     */
    public function setError($error)
    {
        $this->error = $error;
    }


    /**
     * @notes 是否存在错误
     * @return bool
     * @author 段誉
     * @date 2021/7/21 18:32
     */
    public function hasError()
    {
        return !empty($this->error);
    }


    /**
     * @notes 设置状态码
     * @param $code
     * @author 段誉
     * @date 2021/7/28 17:05
     */
    public function setReturnCode($code)
    {
        $this->returnCode = $code;
    }


    /**
     * @notes 特殊场景返回指定状态码,默认为0
     * @return int
     * @author 段誉
     * @date 2021/7/28 15:14
     */
    public function getReturnCode()
    {
        return $this->returnCode;
    }

}