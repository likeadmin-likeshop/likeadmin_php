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

namespace app\adminapi\lists\file;

use app\adminapi\lists\BaseAdminDataLists;
use app\common\lists\ListsSearchInterface;
use app\common\model\file\File;
use app\common\service\FileService;

/**
 * 文件列表
 * Class FileLists
 * @package app\adminapi\lists\file
 */
class FileLists extends BaseAdminDataLists implements ListsSearchInterface
{
    /**
     * @notes 文件搜索条件
     * @return array
     * @author 张无忌
     * @date 2021/7/29 18:11
     */
    public function setSearch(): array
    {
        return [
            '=' => ['type', 'cid'],
            '%like%' => ['name']
        ];
    }

    /**
     * @notes 获取文件列表
     * @return array
     * @throws @\think\db\exception\DataNotFoundException
     * @throws @\think\db\exception\DbException
     * @throws @\think\db\exception\ModelNotFoundException
     * @author 张无忌
     * @date 2021/7/29 18:11
     */
    public function lists(): array
    {
        $lists = (new File())->field(['id,cid,type,name,uri'])
            ->order('id', 'desc')
            ->where($this->searchWhere)
            ->limit($this->limitOffset, $this->limitLength)
            ->select()
            ->toArray();

        foreach ($lists as &$item) {
            $item['url'] = $item['uri'];
            $item['uri'] = FileService::getFileUrl($item['uri']);
        }

        return $lists;
    }

    /**
     * @notes 获取文件数量
     * @return int
     * @author 张无忌
     * @date 2021/7/29 18:11
     */
    public function count(): int
    {
        return (new File())->where($this->searchWhere)->count();
    }
}