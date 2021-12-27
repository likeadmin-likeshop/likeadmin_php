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

namespace app\common\service;

use think\facade\Cache;

class FileService
{
    /**
     * @notes 补全路径
     * @param $uri
     * @param bool $type
     * @return string
     * @author 张无忌
     * @date 2021/7/28 15:08
     */
    public static function getFileUrl($uri = '', $type = false)
    {
        if (strstr($uri, 'http://'))  return $uri;
        if (strstr($uri, 'https://')) return $uri;

        $default = Cache::get('STORAGE_DEFAULT');
        if (!$default) {
            $default = ConfigService::get('storage', 'default', 'local');
            Cache::set('STORAGE_DEFAULT', $default);
        }

        if ($default === 'local') {
            if($type == 'share') {
                return public_path(). $uri;
            }
            return request()->domain() . '/' . $uri;
        } else {
            $storage = Cache::get('STORAGE_ENGINE');
            if (!$storage) {
                $storage = ConfigService::get('storage', $default);
                Cache::set('STORAGE_ENGINE', $storage);
            }
            return $storage['domain'] . '/' . $uri;
        }
    }

    /**
     * @notes 转相对路径
     * @param $uri
     * @return mixed
     * @author 张无忌
     * @date 2021/7/28 15:09
     */
    public static function setFileUrl($uri)
    {
        $default = ConfigService::get('storage', 'default', 'local');
        if ($default === 'local') {
            $domain = request()->domain();
            return str_replace($domain.'/', '', $uri);
        } else {
            $storage = ConfigService::get('storage', $default);
            return str_replace($storage['domain'].'/', '', $uri);
        }
    }
}