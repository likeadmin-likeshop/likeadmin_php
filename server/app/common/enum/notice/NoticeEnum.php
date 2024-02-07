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
namespace app\common\enum\notice;

/**
 * 通知枚举
 * Class NoticeEnum
 * @package app\common\enum
 */
class NoticeEnum
{
    /**
     * 通知类型
     */
    const SYSTEM = 1;
    const SMS = 2;
    const OA = 3;
    const MNP = 4;


    /**
     * 短信验证码场景
     */
    const LOGIN_CAPTCHA = 101;
    const BIND_MOBILE_CAPTCHA = 102;
    const CHANGE_MOBILE_CAPTCHA = 103;
    const FIND_LOGIN_PASSWORD_CAPTCHA = 104;


    /**
     * 验证码场景
     */
    const SMS_SCENE = [
        self::LOGIN_CAPTCHA,
        self::BIND_MOBILE_CAPTCHA,
        self::CHANGE_MOBILE_CAPTCHA,
        self::FIND_LOGIN_PASSWORD_CAPTCHA,
    ];


    //通知类型
    const BUSINESS_NOTIFICATION = 1;//业务通知
    const VERIFICATION_CODE = 2;//验证码


    /**
     * @notes 通知类型
     * @param bool $value
     * @return string|string[]
     * @author ljj
     * @date 2022/2/17 2:49 下午
     */
    public static function getTypeDesc($value = true)
    {
        $data = [
            self::BUSINESS_NOTIFICATION => '业务通知',
            self::VERIFICATION_CODE => '验证码'
        ];
        if ($value === true) {
            return $data;
        }
        return $data[$value];
    }


    /**
     * @notes 获取场景描述
     * @param $sceneId
     * @param false $flag
     * @return string|string[]
     * @author 段誉
     * @date 2022/3/29 11:33
     */
    public static function getSceneDesc($sceneId, $flag = false)
    {
        $desc = [
            self::LOGIN_CAPTCHA => '登录验证码',
            self::BIND_MOBILE_CAPTCHA => '绑定手机验证码',
            self::CHANGE_MOBILE_CAPTCHA => '变更手机验证码',
            self::FIND_LOGIN_PASSWORD_CAPTCHA => '找回登录密码验证码',
        ];

        if ($flag) {
            return $desc;
        }

        return $desc[$sceneId] ?? '';
    }


    /**
     * @notes 更具标记获取场景
     * @param $tag
     * @return int|string
     * @author 段誉
     * @date 2022/9/15 15:08
     */
    public static function getSceneByTag($tag)
    {
        $scene = [
            // 手机验证码登录
            'YZMDL' => self::LOGIN_CAPTCHA,
            // 绑定手机号验证码
            'BDSJHM' => self::BIND_MOBILE_CAPTCHA,
            // 变更手机号验证码
            'BGSJHM' => self::CHANGE_MOBILE_CAPTCHA,
            // 找回登录密码
            'ZHDLMM' => self::FIND_LOGIN_PASSWORD_CAPTCHA,
        ];
        return $scene[$tag] ?? '';
    }


    /**
     * @notes 获取场景变量
     * @param $sceneId
     * @param false $flag
     * @return array|string[]
     * @author 段誉
     * @date 2022/3/29 11:33
     */
    public static function getVars($sceneId, $flag = false)
    {
        $desc = [
            self::LOGIN_CAPTCHA => '验证码:code',
            self::BIND_MOBILE_CAPTCHA => '验证码:code',
            self::CHANGE_MOBILE_CAPTCHA => '验证码:code',
            self::FIND_LOGIN_PASSWORD_CAPTCHA => '验证码:code',
        ];

        if ($flag) {
            return $desc;
        }

        return isset($desc[$sceneId]) ? ['可选变量 ' . $desc[$sceneId]] : [];
    }


    /**
     * @notes 获取系统通知示例
     * @param $sceneId
     * @param false $flag
     * @return array|string[]
     * @author 段誉
     * @date 2022/3/29 11:33
     */
    public static function getSystemExample($sceneId, $flag = false)
    {
        $desc = [];

        if ($flag) {
            return $desc;
        }

        return isset($desc[$sceneId]) ? [$desc[$sceneId]] : [];
    }


    /**
     * @notes 获取短信通知示例
     * @param $sceneId
     * @param false $flag
     * @return array|string[]
     * @author 段誉
     * @date 2022/3/29 11:33
     */
    public static function getSmsExample($sceneId, $flag = false)
    {
        $desc = [
            self::LOGIN_CAPTCHA => '您正在登录，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::BIND_MOBILE_CAPTCHA => '您正在绑定手机号，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::CHANGE_MOBILE_CAPTCHA => '您正在变更手机号，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::FIND_LOGIN_PASSWORD_CAPTCHA => '您正在找回登录密码，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
        ];

        if ($flag) {
            return $desc;
        }

        return isset($desc[$sceneId]) ? ['示例：' . $desc[$sceneId]] : [];
    }


    /**
     * @notes 获取公众号模板消息示例
     * @param $sceneId
     * @param false $flag
     * @return array|string[]|\string[][]
     * @author 段誉
     * @date 2022/3/29 11:33
     */
    public static function getOaExample($sceneId, $flag = false)
    {
        $desc = [];

        if ($flag) {
            return $desc;
        }

        return $desc[$sceneId] ?? [];
    }


    /**
     * @notes 获取小程序订阅消息示例
     * @param $sceneId
     * @param false $flag
     * @return array|mixed
     * @author 段誉
     * @date 2022/3/29 11:33
     */
    public static function getMnpExample($sceneId, $flag = false)
    {
        $desc = [];

        if ($flag) {
            return $desc;
        }

        return $desc[$sceneId] ?? [];
    }


    /**
     * @notes 提示
     * @param $type
     * @param $sceneId
     * @return array|string|string[]|\string[][]
     * @author 段誉
     * @date 2022/3/29 11:33
     */
    public static function getOperationTips($type, $sceneId)
    {
        // 场景变量
        $vars = self::getVars($sceneId);
        // 其他提示
        $other = [];
        // 示例
        switch ($type) {
            case self::SYSTEM:
                $example = self::getSystemExample($sceneId);
                break;
            case self::SMS:
                $other[] = '生效条件：1、管理后台完成短信设置。 2、第三方短信平台申请模板。';
                $example = self::getSmsExample($sceneId);
                break;
            case self::OA:
                $other[] = '配置路径：公众号后台 > 广告与服务 > 模板消息';
                $other[] = '推荐行业：主营行业：IT科技/互联网|电子商务 副营行业：消费品/消费品';
                $example = self::getOaExample($sceneId);
                break;
            case self::MNP:
                $other[] = '配置路径：小程序后台 > 功能 > 订阅消息';
                $example = self::getMnpExample($sceneId);
                break;
        }
        $tips = array_merge($vars, $example, $other);

        return $tips;
    }
}