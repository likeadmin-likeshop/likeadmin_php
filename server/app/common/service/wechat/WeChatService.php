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
namespace app\common\service\wechat;


use app\common\logic\BaseLogic;
use EasyWeChat\Factory;
use EasyWeChat\Kernel\Exceptions\Exception;


/**
 * 微信功能类
 * Class WeChatService
 * @package app\common\service
 */
class WeChatService extends BaseLogic
{
    /**
     * @notes 公众号-根据code获取微信信息
     * @param array $params
     * @return array
     * @throws Exception
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Overtrue\Socialite\Exceptions\AuthorizeFailedException
     * @author cjhao
     * @date 2021/8/16 14:55
     */
    public static function getOaResByCode(array $params)
    {
        $config = WeChatConfigService::getOaConfig();
        $app = Factory::officialAccount($config);

        $response = $app->oauth
            ->scopes(['snsapi_userinfo'])
            ->userFromCode($params['code'])
            ->getRaw();

        if (!isset($response['openid']) || empty($response['openid'])) {
            throw new Exception('获取openID失败');
        }
        return $response;
    }


    /**
     * @notes 小程序-根据code获取微信信息
     * @param $post
     * @return array|\EasyWeChat\Kernel\Support\Collection|object|\Psr\Http\Message\ResponseInterface|string
     * @throws Exception
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @author cjhao
     * @date 2021/8/16 14:57
     */
    public static function getMnpResByCode($post)
    {
        $config = WeChatConfigService::getMnpConfig();
        $app = Factory::miniProgram($config);
        $response = $app->auth->session($post['code']);
        if (!isset($response['openid']) || empty($response['openid'])) {
            throw new Exception('获取openID失败');
        }
        return $response;
    }

    /**
     * @notes 公众号跳转url
     * @param $url
     * @return string
     * @author cjhao
     * @date 2021/8/16 15:00
     */
    public static function getCodeUrl($url)
    {
        $config = WeChatConfigService::getOaConfig();
        $app = Factory::officialAccount($config);
        $response = $app->oauth
            ->scopes(['snsapi_userinfo'])
            ->redirect($url);
        return $response;
    }

}