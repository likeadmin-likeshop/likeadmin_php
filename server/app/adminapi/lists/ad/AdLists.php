<?php
// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
// +----------------------------------------------------------------------

namespace app\adminapi\lists\ad;


use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\ad\Ad;

/**
 * 广告列表
 * Class AdLists
 * @package app\adminapi\lists\ad
 */
class AdLists extends BaseAdminDataLists implements ListsSearchInterface
{
    /**
     * @notes 搜索条件
     * @return \string[][]
     * @author ljj
     * @date 2022/2/14 5:53 下午
     */
    public function setSearch(): array
    {
        return [
            '%like%' => ['name'],
            '=' => ['status','pid']
        ];
    }

    /**
     * @notes 广告列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/2/14 6:02 下午
     */
    public function lists(): array
    {
        $lists = (new Ad())->field('id,name,pid,image,link_type,link_address,sort,status')
            ->order(['sort'=>'asc','id'=>'desc'])
            ->append(['link_address_desc','ap_name'])
            ->where($this->searchWhere)
            ->limit($this->limitOffset,$this->limitLength)
            ->select()
            ->toArray();

        return $lists;
    }

    /**
     * @notes 广告总数
     * @return int
     * @author ljj
     * @date 2022/2/14 6:03 下午
     */
    public function count(): int
    {
        return (new Ad())->where($this->searchWhere)->count();
    }
}