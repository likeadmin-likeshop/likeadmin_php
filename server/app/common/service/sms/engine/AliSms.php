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

use AlibabaCloud\Client\AlibabaCloud;

/**
 * 阿里云短信
 * Class AliSms
 * @package app\common\service\sms\engine
 */
class AliSms
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
        $this->templateParams = json_encode($templateParams, JSON_UNESCAPED_UNICODE);
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
            AlibabaCloud::accessKeyClient($this->config['app_key'], $this->config['secret_key'])
                ->regionId('cn-hangzhou')
                ->asDefaultClient();

            $result = AlibabaCloud::rpcRequest()
                ->product('Dysmsapi')
                ->host('dysmsapi.aliyuncs.com')
                ->version('2017-05-25')
                ->action('SendSms')
                ->method('POST')
                ->options([
                    'query' => [
                        'PhoneNumbers'  => $this->mobile,            //发送手机号
                        'SignName'      => $this->config['sign'],    //短信签名
                        'TemplateCode'  => $this->templateId,     //短信模板CODE
                        'TemplateParam' => $this->templateParams,    //自定义随机数
                    ],
                ])
                ->request();

            $res = $result->toArray();
            if (isset($res['Code']) && $res['Code'] == 'OK') {
                return $res;
            }
            $message = $res['Message'] ?? $res;
            throw new \Exception('阿里云短信错误：' . $message);
        } catch(\Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }
}