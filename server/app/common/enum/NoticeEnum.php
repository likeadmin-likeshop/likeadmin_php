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
namespace app\common\enum;

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
    const REGISTER_CAPTCHA = 100;
    const LOGIN_CAPTCHA = 101;
    const BIND_MOBILE_CAPTCHA = 102;
    const CHANGE_MOBILE_CAPTCHA = 103;
    const FIND_LOGIN_PASSWORD_CAPTCHA = 104;
    const FIND_PAY_PASSWORD_CAPTCHA = 105;

    /**
     * 业务通知场景
     */
    const ORDER_PAY_NOTICE = 106;
    const ORDER_SHIP_NOTICE = 107;
    const REFUND_REFUSE_NOTICE = 108;
    const REFUND_SUCCESS_NOTICE = 109;
    const EARNINGS_NOTICE = 110;
    const SELLER_ORDER_PAY_NOTICE = 200;
    const SELLER_REFUND_APPLY_NOTICE = 201;
    const RECEIVING_CODE_NOTICE = 202;

    /**
     * 订单场景
     */
    const ORDER_SCENE = [
        self::ORDER_PAY_NOTICE,
        self::ORDER_SHIP_NOTICE,
        self::SELLER_REFUND_APPLY_NOTICE,
        self::RECEIVING_CODE_NOTICE,
    ];


    /**
     * 验证码场景
     */
    const SMS_SCENE = [
        self::REGISTER_CAPTCHA,
        self::LOGIN_CAPTCHA,
        self::BIND_MOBILE_CAPTCHA,
        self::CHANGE_MOBILE_CAPTCHA,
        self::FIND_LOGIN_PASSWORD_CAPTCHA,
        self::FIND_PAY_PASSWORD_CAPTCHA,
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
            self::REGISTER_CAPTCHA => '注册验证码',
            self::LOGIN_CAPTCHA => '登录验证码',
            self::BIND_MOBILE_CAPTCHA => '绑定手机验证码',
            self::CHANGE_MOBILE_CAPTCHA => '变更手机验证码',
            self::FIND_LOGIN_PASSWORD_CAPTCHA => '找回登录密码验证码',
            self::FIND_PAY_PASSWORD_CAPTCHA => '找回支付密码验证码',
            self::ORDER_PAY_NOTICE => '订单付款通知',
            self::ORDER_SHIP_NOTICE => '订单发货通知',
            self::REFUND_REFUSE_NOTICE => '售后退款拒绝通知',
            self::REFUND_SUCCESS_NOTICE => '售后退款成功通知',
            self::EARNINGS_NOTICE => '佣金入账通知',
            self::SELLER_ORDER_PAY_NOTICE => '订单付款通知',
            self::SELLER_REFUND_APPLY_NOTICE => '售后退款申请通知',
            self::RECEIVING_CODE_NOTICE => '收货码通知',
        ];

        if($flag) {
            return $desc;
        }

        return $desc[$sceneId] ?? '';
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
            self::REGISTER_CAPTCHA => '验证码:code',
            self::LOGIN_CAPTCHA => '验证码:code',
            self::BIND_MOBILE_CAPTCHA => '验证码:code',
            self::CHANGE_MOBILE_CAPTCHA => '验证码:code',
            self::FIND_LOGIN_PASSWORD_CAPTCHA => '验证码:code',
            self::FIND_PAY_PASSWORD_CAPTCHA => '验证码:code',
            self::ORDER_PAY_NOTICE => '用户昵称:nickname 订单编号:order_sn 支付时间:pay_time',
            self::ORDER_SHIP_NOTICE => '用户昵称:nickname 订单编号:order_sn 快递名称:express_name 物流单号:invoice_no',
            self::REFUND_REFUSE_NOTICE => '用户昵称:nickname 售后单号:after_sale_sn',
            self::REFUND_SUCCESS_NOTICE => '用户昵称:nickname 售后单号:after_sale_sn 退款金额:refund_amount',
            self::EARNINGS_NOTICE => '用户昵称:nickname 预估收益:earnings',
            self::SELLER_ORDER_PAY_NOTICE => '订单编号:order_sn',
            self::SELLER_REFUND_APPLY_NOTICE => '售后单号:after_sale_sn',
            self::RECEIVING_CODE_NOTICE => '用户昵称:nickname 订单编号:order_sn',
        ];

        if($flag) {
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
        $desc = [
            self::ORDER_PAY_NOTICE => '亲爱的{nickname}，您的订单 {order_sn}已支付成功，商家正在快马加鞭为您安排发货。',
            self::ORDER_SHIP_NOTICE => '亲爱的{nickname}、您的订单{order_sn}已发货，{express_name}单号{invoice_no}，请保持收件手机畅通!。',
            self::REFUND_REFUSE_NOTICE => '亲爱的{nickname}，您的售后申请{after_sale_sn}已被卖家拒绝。',
            self::REFUND_SUCCESS_NOTICE => '亲爱的{nickname}，您的售后申请{after_sale_sn}已成功退款。',
            self::EARNINGS_NOTICE => '亲爱的${nickname}，恭喜您获得预估收益${earnings}元。',
        ];

        if($flag) {
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
            self::REGISTER_CAPTCHA => '您正在申请注册，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::LOGIN_CAPTCHA => '您正在登录，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::BIND_MOBILE_CAPTCHA => '您正在绑定手机号，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::CHANGE_MOBILE_CAPTCHA => '您正在变更手机号，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::FIND_LOGIN_PASSWORD_CAPTCHA => '您正在找回登录密码，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::FIND_PAY_PASSWORD_CAPTCHA => '您正在找回支付密码，验证码${code}，切勿将验证码泄露于他人，本条验证码有效期5分钟。',
            self::ORDER_PAY_NOTICE => '亲爱的${nickname}，您的订单${order_sn}已支付成功，商家正在快马加鞭为您安排发货。',
            self::ORDER_SHIP_NOTICE => '亲爱的${nickname}、您的订单${order_sn}已发货，${express_name}单号${invoice_no}，请保持收件手机畅通。',
            self::REFUND_REFUSE_NOTICE => '亲爱的${nickname}，您的售后申请${after_sale_sn}已被卖家拒绝。',
            self::REFUND_SUCCESS_NOTICE => '亲爱的${nickname}，您的售后申请${after_sale_sn}已成功退款。',
            self::EARNINGS_NOTICE => '亲爱的${nickname}，恭喜您获得预估收益${earnings}元。',
            self::SELLER_ORDER_PAY_NOTICE => '亲爱的卖家，您有新的付款订单，订单编号${order_sn}，请及时处理。',
            self::SELLER_REFUND_APPLY_NOTICE => '亲爱的卖家，您有新的售后申请，售后单号${after_sale_sn}，请及时处理。',
            self::RECEIVING_CODE_NOTICE => '亲爱的${nickname}，您的订单${order_sn}已支付成功，商家正在快马加鞭为您安排。',
        ];

        if($flag) {
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
        $desc = [
            self::ORDER_PAY_NOTICE => [
                '模板库: 搜索 “订单支付成功通知”，选用编号：OPENTM201285651的模板，添加，获得模板ID。',
                '头部内容：您的订单已支付成功。',
                '尾部内容：商家正在快马加鞭为您安排发货。',
                '字段名 字段值 字段内容',
                '商品名称 keyword1 {goods_name}',
                '订单编号 keyword2 {order_sn}',
                '支付金额 keyword3 {order_amount}',
            ],
            self::ORDER_SHIP_NOTICE => [
                '模板库: 搜索 “订单发货通知”，选用编号：OPENTM414956350的模板，添加，获得模板ID。',
                '头部内容：您购买的订单已经发货啦，正快马加鞭向您飞奔而去。',
                '尾部内容：请保持收件手机畅通。',
                '字段名 字段值 字段内容',
                '订单编号 keyword1 {order_sn}',
                '发货时间 keyword2 {ship_time}',
                '物流公司 keyword3 {express_name}',
                '快递单号 keyword4 {invoice_no}',
            ],
            self::REFUND_REFUSE_NOTICE => [
                '模板库: 搜索 “拒绝退款通知”，选用编号：OPENTM417819858的模板，添加，获得模板ID。',
                '头部内容：您好！您的退款申请已被卖家拒绝。',
                '尾部内容：如有任何疑问请与卖家联系。',
                '字段名 字段值 字段内容',
                '单号 keyword1 {after_sale_sn}',
                '金额 keyword2 {refund_amount}',
                '时间 keyword3 {refuse_time}',
            ],
            self::REFUND_SUCCESS_NOTICE => [
                '模板库: 搜索 “退款成功提醒”，选用编号：OPENTM416378254的模板，添加，获得模板ID。',
                '头部内容： 您好！您有售后申请已成功退款。',
                '尾部内容： 请注意查收哦。',
                '字段名 字段值 字段内容',
                '退款金额 keyword1 {refund_amount}',
                '退款时间 keyword2 {refund_time}',
                '退款方式 keyword3 {refund_way}',
            ],
            self::EARNINGS_NOTICE => [
                '模板库: 搜索 “佣金提醒”，选用编号：OPENTM400094720的模板，添加，获得模板ID。',
                '头部内容： 恭喜您，获得了一笔新的预估收益。',
                '尾部内容： 请注意查收哦。',
                '字段名 字段值 字段内容',
                '佣金金额 keyword1 {earnings}',
                '时间 keyword2 {time}',
            ],
        ];

        if($flag) {
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
        $desc = [
            self::ORDER_PAY_NOTICE => [
                '模板库: 搜索 “订单支付成功通知”，选用类目：软件服务提供商的模板，选用并选择以下参数，提交获得模板ID。',
                '字段名 字段值 字段内容',
                '订单编号 character_string1 {order_sn}',
                '支付时间 time2 {pay_time}',
                '订单金额 amount3 {order_amount}',
                '商品名称 thing4 {goods_name}',
            ],
            self::ORDER_SHIP_NOTICE => [
                '模板库: 搜索 “订单发货通知”，选用类目：软件服务提供商的模板，选用并选择以下参数，提交获得模板ID。',
                '字段名 字段值 字段内容',
                '商品名称 thing1 {goods_name}',
                '订单号 character_string2 {order_sn}',
                '发货时间 date3 {ship_time}',
                '快递公司 thing4 {express_name}',
                '快递单号 character_string5 {invoice_no}',
            ],
            self::REFUND_REFUSE_NOTICE => [
                '模板库: 搜索 “退款失败通知”，选用类目：软件服务提供商的模板，选用并选择以下参数，提交获得模板ID。',
                '字段名 字段值 字段内容',
                '退款金额 amount3 {refund_amount}',
                '失败原因 thing5 {reason}',
            ],
            self::REFUND_SUCCESS_NOTICE => [],
            self::EARNINGS_NOTICE => [],
        ];

        if($flag) {
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
                $other[] = '生效条件：1、管理后台完成短信设置。 2、第三方短信平台申请模板 3、若是腾讯云模板变量名须换成变量名出现顺序对应的数字(例：您好{nickname},您的订单{order_sn}已发货! 须改为 您好{1},您的订单{2}已发货!)';
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