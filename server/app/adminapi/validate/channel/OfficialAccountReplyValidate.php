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

namespace app\adminapi\validate\channel;

use app\common\validate\BaseValidate;

/**
 * 微信公众号回复验证器
 * Class OfficialAccountReplyValidate
 * @package app\adminapi\validate\channel
 */
class OfficialAccountReplyValidate extends BaseValidate
{
    protected $rule = [
        'id' => 'require|integer',
        'reply_type' => 'require|in:1,2,3',
        'name' => 'require',
        'content_type' => 'require|in:1',
        'content' => 'require',
        'status' => 'require|in:0,1',
        'keyword' => 'requireIf:reply_type,2',
        'matching_type' => 'requireIf:reply_type,2|in:1,2',
        'sort' => 'requireIf:reply_type,2',
        'reply_num' => 'requireIf:reply_type,2|in:1',
        'new_sort' => 'require|integer|egt:0',
    ];

    protected $message = [
        'reply_type.require' => '请输入回复类型',
        'reply_type.in' => '回复类型状态值错误',
        'name.require' => '请输入规则名称',
        'content_type.require' => '请选择内容类型',
        'content_type.in' => '内容类型状态值有误',
        'content.require' => '请输入回复内容',
        'status.require' => '请选择启用状态',
        'status.in' => '启用状态值错误',
        'keyword.requireIf' => '请输入关键词',
        'matching_type.requireIf' => '请选择匹配类型',
        'matching_type.in' => '匹配类型状态值错误',
        'sort.requireIf' => '请输入排序值',
        'sort.integer' => '排序值须为整型',
        'sort.egt' => '排序值须大于或等于0',
        'reply_num.requireIf' => '请选择回复数量',
        'reply_num.in' => '回复数量状态值错误',
        'id.require' => '参数缺失',
        'id.integer' => '参数格式错误',
        'new_sort.require' => '请输入新排序值',
        'new_sort.integer' => '新排序值须为整型',
        'new_sort.egt' => '新排序值须大于或等于0',
    ];

    protected $scene = [
        'add' => ['reply_type', 'name', 'content_type', 'content', 'status', 'keyword', 'matching_type', 'sort', 'reply_num'],
        'detail' => ['id'],
        'delete' => ['id'],
        'sort' => ['id', 'new_sort'],
        'status' => ['id'],
        'edit' => ['id', 'reply_type', 'name', 'content_type', 'content', 'status','keyword', 'matching_type', 'sort', 'reply_num']
    ];
}