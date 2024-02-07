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

namespace app\adminapi\lists\file;

use app\adminapi\lists\BaseAdminDataLists;
use app\adminapi\logic\FileLogic;
use app\common\enum\FileEnum;
use app\common\lists\ListsSearchInterface;
use app\common\model\file\File;
use app\common\model\file\FileCate;
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
     * @return \string[][]
     * @author 段誉
     * @date 2021/12/29 14:27
     */
    public function setSearch(): array
    {
        return [
            '=' => ['type', 'source'],
            '%like%' => ['name']
        ];
    }

    /**
     * @notes 额外查询处理
     * @return array
     * @author 段誉
     * @date 2024/2/7 10:26
     */
    public function queryWhere(): array
    {
        $where = [];

        if (!empty($this->params['cid'])) {
            $cateChild = FileLogic::getCateIds($this->params['cid']);
            array_push($cateChild, $this->params['cid']);
            $where[] = ['cid', 'in', $cateChild];
        }

        return $where;
    }


    /**
     * @notes 获取文件列表
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author 段誉
     * @date 2021/12/29 14:27
     */
    public function lists(): array
    {
        $lists = (new File())->field(['id,cid,type,name,uri,create_time'])
            ->order('id', 'desc')
            ->where($this->searchWhere)
            ->where($this->queryWhere())
//            ->where('source', FileEnum::SOURCE_ADMIN)
            ->limit($this->limitOffset, $this->limitLength)
            ->select()
            ->toArray();

        foreach ($lists as &$item) {
            $item['url'] = FileService::getFileUrl($item['uri']);
        }

        return $lists;
    }


    /**
     * @notes 获取文件数量
     * @return int
     * @author 段誉
     * @date 2021/12/29 14:29
     */
    public function count(): int
    {
        return (new File())->where($this->searchWhere)
            ->where($this->queryWhere())
//            ->where('source', FileEnum::SOURCE_ADMIN)
            ->count();
    }
}
