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

namespace app\adminapi\lists\channel;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\channel\OfficialAccountReply;

/**
 * 微信公众号回复列表
 * Class OfficialAccountLists
 * @package app\adminapi\lists
 */
class OfficialAccountReplyLists extends BaseAdminDataLists implements ListsSearchInterface
{

    /**
     * @notes 设置搜索
     * @return \string[][]
     * @author 段誉
     * @date 2022/3/30 15:02
     */
    public function setSearch(): array
    {
        return [
            '=' => ['reply_type']
        ];
    }


    /**
     * @notes 回复列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2022/3/30 15:02
     */
    public function lists(): array
    {
        $field = 'id,name,keyword,matching_type,content_type,status,sort';
        $field .= ',matching_type as matching_type_desc,content_type as content_type_desc,status as status_desc';

        $this->sortOrder = ['sort' => 'desc', 'id' => 'desc'];

        $lists = OfficialAccountReply::field($field)
            ->where($this->searchWhere)
            ->order($this->sortOrder)
            ->limit($this->limitOffset, $this->limitLength)
            ->select()
            ->toArray();

        return $lists;
    }


    /**
     * @notes 回复记录数
     * @return int
     * @author 段誉
     * @date 2022/3/30 15:02
     */
    public function count(): int
    {
        $count = OfficialAccountReply::where($this->searchWhere)->count();

        return $count;
    }
}