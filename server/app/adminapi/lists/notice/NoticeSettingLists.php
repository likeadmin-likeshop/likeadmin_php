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

namespace app\adminapi\lists\notice;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\notice\NoticeSetting;

/**
 * 通知设置
 * Class NoticeSettingLists
 * @package app\adminapi\lists\notice
 */
class NoticeSettingLists extends BaseAdminDataLists implements ListsSearchInterface
{
    /**
     * @notes 搜索条件
     * @return \string[][]
     * @author ljj
     * @date 2022/2/17 2:21 下午
     */
    public function setSearch(): array
    {
        return [
            '=' => ['recipient', 'type']
        ];
    }

    /**
     * @notes 通知设置列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/2/16 3:18 下午
     */
    public function lists(): array
    {
        $lists = (new NoticeSetting())->field('id,scene_name,sms_notice,type')
            ->append(['sms_status_desc','type_desc'])
            ->where($this->searchWhere)
            ->select()
            ->toArray();

        return $lists;
    }

    /**
     * @notes 通知设置数量
     * @return int
     * @author ljj
     * @date 2022/2/16 3:18 下午
     */
    public function count(): int
    {
        return (new NoticeSetting())->where($this->searchWhere)->count();
    }
}