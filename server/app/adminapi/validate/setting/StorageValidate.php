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

namespace app\adminapi\validate\setting;


use app\common\validate\BaseValidate;


/**
 * 存储引擎验证
 * Class StorageValidate
 * @package app\adminapi\validate\setting
 */
class StorageValidate extends BaseValidate
{

    protected $rule = [
        'engine' => 'require',
        'status' => 'require',
    ];



    /**
     * @notes 设置存储引擎参数场景
     * @return StorageValidate
     * @author 段誉
     * @date 2022/4/20 16:18
     */
    public function sceneSetup()
    {
        return $this->only(['engine', 'status']);
    }


    /**
     * @notes 获取配置参数信息场景
     * @return StorageValidate
     * @author 段誉
     * @date 2022/4/20 16:18
     */
    public function sceneDetail()
    {
        return $this->only(['engine']);
    }


    /**
     * @notes 切换存储引擎场景
     * @return StorageValidate
     * @author 段誉
     * @date 2022/4/20 16:18
     */
    public function sceneChange()
    {
        return $this->only(['engine']);
    }
}