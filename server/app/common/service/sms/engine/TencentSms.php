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
// | // +----------------------------------------------------------------------
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
// +----------------------------------------------------------------------
namespace app\common\service\sms\engine;

use TencentCloud\Sms\V20190711\SmsClient;
use TencentCloud\Sms\V20190711\Models\SendSmsRequest;
use TencentCloud\Common\Exception\TencentCloudSDKException;
use TencentCloud\Common\Credential;
use TencentCloud\Common\Profile\ClientProfile;
use TencentCloud\Common\Profile\HttpProfile;

/**
 * 腾讯云短信
 * Class TencentSms
 * @package app\common\service\sms\engine
 */
class TencentSms
{
    protected $error = null;
    protected $config;
    protected $mobile;
    protected $templateId;
    protected $templateParams;


    /**
     * @notes 架构方法
     * @param $config
     * @author Tab
     * @date 2021/8/19 17:46
     */
    public function __construct($config)
    {
        if(empty($config)) {
            $this->error = '请联系管理员配置参数';
            return false;
        }
        $this->config = $config;
    }

    /**
     * @notes 设置手机号
     * @param $mobile
     * @return $this
     * @author Tab
     * @date 2021/8/19 16:52
     */
    public function setMobile($mobile)
    {
        $this->mobile = $mobile;
        return $this;
    }

    /**
     * @notes 设置模板id
     * @param $templateId
     * @return $this
     * @author Tab
     * @date 2021/8/19 16:54
     */
    public function setTemplateId($templateId)
    {
        $this->templateId = $templateId;
        return $this;
    }

    /**
     * @notes 设置模板参数
     * @param $templateParams
     * @return $this
     * @author Tab
     * @date 2021/8/19 16:56
     */
    public function setTemplateParams($templateParams)
    {
        $this->templateParams = $templateParams;
        return $this;
    }

    /**
     * @notes 获取错误信息
     * @return mixed
     * @author Tab
     * @date 2021/8/19 18:12
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * @notes 发送短信
     * @return false|mixed
     * @author Tab
     * @date 2021/8/19 17:46
     */
    public function send()
    {
        try {
            $cred = new Credential($this->config['secret_id'], $this->config['secret_key']);
            $httpProfile = new HttpProfile();
            $httpProfile->setEndpoint("sms.tencentcloudapi.com");

            $clientProfile = new ClientProfile();
            $clientProfile->setHttpProfile($httpProfile);

            $client = new SmsClient($cred, 'ap-guangzhou', $clientProfile);
            $params = [
                'PhoneNumberSet'    => ['+86' . $this->mobile],
                'TemplateID'        => $this->templateId,
                'Sign'              => $this->config['sign'],
                'TemplateParamSet'  => $this->templateParams,
                'SmsSdkAppid'       => $this->config['app_id'],
            ];
            $req = new SendSmsRequest();
            $req->fromJsonString(json_encode($params));
            $resp = json_decode($client->SendSms($req)->toJsonString(), true);
            if (isset($resp['SendStatusSet']) && $resp['SendStatusSet'][0]['Code'] == 'Ok') {
                return $resp;
            } else {
                $message = $res['SendStatusSet'][0]['Message'] ?? json_encode($resp);
                throw new \Exception('腾讯云短信错误：' . $message);
            }
        } catch(\Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }
}