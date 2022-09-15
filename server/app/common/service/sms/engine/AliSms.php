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
     * @author 段誉
     * @date 2022/9/15 16:28
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
     * @author 段誉
     * @date 2022/9/15 16:28
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
     * @author 段誉
     * @date 2022/9/15 16:28
     */
    public function setTemplateParams($templateParams)
    {
        $this->templateParams = json_encode($templateParams, JSON_UNESCAPED_UNICODE);
        return $this;
    }


    /**
     * @notes 错误信息
     * @return string|null
     * @author 段誉
     * @date 2022/9/15 16:27
     */
    public function getError()
    {
        return $this->error;
    }


    /**
     * @notes 发送短信
     * @return array|false
     * @author 段誉
     * @date 2022/9/15 16:27
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