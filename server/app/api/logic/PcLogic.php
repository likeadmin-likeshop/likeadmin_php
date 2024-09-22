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

namespace app\api\logic;


use app\common\enum\YesNoEnum;
use app\common\logic\BaseLogic;
use app\common\model\article\Article;
use app\common\model\article\ArticleCate;
use app\common\model\article\ArticleCollect;
use app\common\model\decorate\DecoratePage;
use app\common\service\ConfigService;
use app\common\service\FileService;


/**
 * index
 * Class IndexLogic
 * @package app\api\logic
 */
class PcLogic extends BaseLogic
{

    /**
     * @notes 首页数据
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/21 19:15
     */
    public static function getIndexData()
    {
        // 装修配置
        $decoratePage = DecoratePage::findOrEmpty(4);
        // 最新资讯
        $newArticle = self::getLimitArticle('new', 7);
        // 全部资讯
        $allArticle = self::getLimitArticle('all', 5);
        // 热门资讯
        $hotArticle = self::getLimitArticle('hot', 8);

        return [
            'page' => $decoratePage,
            'all' => $allArticle,
            'new' => $newArticle,
            'hot' => $hotArticle
        ];
    }


    /**
     * @notes 获取文章
     * @param string $sortType
     * @param int $limit
     * @return mixed
     * @author 段誉
     * @date 2022/10/19 9:53
     */
    public static function getLimitArticle(string $sortType, int $limit = 0, int $cate = 0, int $excludeId = 0)
    {
        // 查询字段
        $field = [
            'id', 'cid', 'title', 'desc', 'abstract', 'image',
            'author', 'click_actual', 'click_virtual', 'create_time'
        ];

        // 排序条件
        $orderRaw = 'sort desc, id desc';
        if ($sortType == 'new') {
            $orderRaw = 'id desc';
        }
        if ($sortType == 'hot') {
            $orderRaw = 'click_actual + click_virtual desc, id desc';
        }

        // 查询条件
        $where[] = ['is_show', '=', YesNoEnum::YES];
        if (!empty($cate)) {
            $where[] = ['cid', '=', $cate];
        }
        if (!empty($excludeId)) {
            $where[] = ['id', '<>', $excludeId];
        }

        $article = Article::field($field)
            ->where($where)
            ->append(['click'])
            ->orderRaw($orderRaw)
            ->hidden(['click_actual', 'click_virtual']);

        if ($limit) {
            $article->limit($limit);
        }

        return $article->select()->toArray();
    }


    /**
     * @notes 获取配置
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/9/21 19:38
     */
    public static function getConfigData()
    {
        // 登录配置
        $loginConfig = [
            // 登录方式
            'login_way' => ConfigService::get('login', 'login_way', config('project.login.login_way')),
            // 注册强制绑定手机
            'coerce_mobile' => ConfigService::get('login', 'coerce_mobile', config('project.login.coerce_mobile')),
            // 政策协议
            'login_agreement' => ConfigService::get('login', 'login_agreement', config('project.login.login_agreement')),
            // 第三方登录 开关
            'third_auth' => ConfigService::get('login', 'third_auth', config('project.login.third_auth')),
            // 微信授权登录
            'wechat_auth' => ConfigService::get('login', 'wechat_auth', config('project.login.wechat_auth')),
            // qq授权登录
            'qq_auth' => ConfigService::get('login', 'qq_auth', config('project.login.qq_auth')),
        ];

        // 网站信息
        $website = [
            'shop_name' => ConfigService::get('website', 'shop_name'),
            'shop_logo' => FileService::getFileUrl(ConfigService::get('website', 'shop_logo')),
            'pc_logo' => FileService::getFileUrl(ConfigService::get('website', 'pc_logo')),
            'pc_title' => ConfigService::get('website', 'pc_title'),
            'pc_ico' => FileService::getFileUrl(ConfigService::get('website', 'pc_ico')),
            'pc_desc' => ConfigService::get('website', 'pc_desc'),
            'pc_keywords' => ConfigService::get('website', 'pc_keywords'),
        ];

        // 站点统计
        $siteStatistics = [
            'clarity_code' => ConfigService::get('siteStatistics', 'clarity_code'),
        ];

        // 备案信息
        $copyright = ConfigService::get('copyright', 'config', []);

        // 公众号二维码
        $oaQrCode = ConfigService::get('oa_setting', 'qr_code', '');
        $oaQrCode = empty($oaQrCode) ? $oaQrCode : FileService::getFileUrl($oaQrCode);
        // 小程序二维码
        $mnpQrCode = ConfigService::get('mnp_setting', 'qr_code', '');
        $mnpQrCode = empty($mnpQrCode) ? $mnpQrCode : FileService::getFileUrl($mnpQrCode);

        return [
            'domain' => FileService::getFileUrl(),
            'login' => $loginConfig,
            'website' => $website,
            'siteStatistics' => $siteStatistics,
            'version' => config('project.version'),
            'copyright' => $copyright,
            'admin_url' => request()->domain() . '/admin',
            'qrcode' => [
                'oa' => $oaQrCode,
                'mnp' => $mnpQrCode,
            ]
        ];
    }


    /**
     * @notes 资讯中心
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/10/19 16:55
     */
    public static function getInfoCenter()
    {
        $data = ArticleCate::field(['id', 'name'])
            ->with(['article' => function ($query) {
                $query->hidden(['content', 'click_virtual', 'click_actual'])
                    ->order(['sort' => 'desc', 'id' => 'desc'])
                    ->append(['click'])
                    ->limit(10);
            }])
            ->where(['is_show' => YesNoEnum::YES])
            ->order(['sort' => 'desc', 'id' => 'desc'])
            ->select()
            ->toArray();

        return $data;
    }


    /**
     * @notes 获取文章详情
     * @param $userId
     * @param $articleId
     * @param string $source
     * @return array
     * @author 段誉
     * @date 2022/10/20 15:18
     */
    public static function getArticleDetail($userId, $articleId, $source = 'default')
    {
        // 文章详情
        $detail = Article::getArticleDetailArr($articleId);

        // 根据来源列表查找对应列表
        $nowIndex = 0;
        $lists = self::getLimitArticle($source, 0, $detail['cid']);
        foreach ($lists as $key => $item) {
            if ($item['id'] == $articleId) {
                $nowIndex = $key;
            }
        }
        // 上一篇
        $detail['last'] = $lists[$nowIndex - 1] ?? [];
        // 下一篇
        $detail['next'] = $lists[$nowIndex + 1] ?? [];

        // 最新资讯
        $detail['new'] = self::getLimitArticle('new', 8, $detail['cid'], $detail['id']);
        // 关注状态
        $detail['collect'] = ArticleCollect::isCollectArticle($userId, $articleId);
        // 分类名
        $detail['cate_name'] = ArticleCate::where('id', $detail['cid'])->value('name');

        return $detail;
    }

}