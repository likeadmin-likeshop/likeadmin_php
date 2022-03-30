import request from "@/utils/request";
import * as Interface from './mp_wechat.d.ts'

/** S 渠道设置 **/
// 获取渠道信息
export const apiMPWeChatConfigInfo = (): Promise<any> =>
    request.get('/channel.official_account_setting/getConfig')

// 编辑渠道信息
export const apiMpWeChatConfigEdit = (params: Interface.MPWeChatConfigEdit_Req) =>
    request.post('/channel.official_account_setting/setConfig', params)

/** E 渠道设置 **/


/** S 菜单设置 **/
// 获取菜单详情
export const apiMpWeChatMenuDetail = (): Promise<any> =>
    request.get('/channel.official_account_menu/detail')

// 保存菜单配置
export const apiMpWeChatMenuSave = (params: any) =>
    request.post('/channel.official_account_menu/save', params)

// 发布菜单配置
export const apiMpWeChatMenuPublish = (params: any) =>
    request.post('/channel.official_account_menu/saveAndPublish', params)
/** E 菜单设置 **/


/** S 回复管理 **/
// 新增回复(关注/关词词/默认)
export const apiMpWeChatReplyAdd = (params: any): Promise<any> =>
    request.post('/channel.official_account_reply/add', params)

// 编辑回复(关注/关键词/默认)
export const apiMpWeChatReplyEdit = (params: any): Promise<any> =>
    request.post('/channel.official_account_reply/edit', params)

// 获取回复详情
export const apiMpWeChatReplyDetail = (params: any): Promise<any> =>
    request.get('/channel.official_account_reply/detail', {params})
	
// 删除回复
export const apiMpWeChatReplyDelete = (params: any): Promise<any> =>
	request.post('/channel.official_account_reply/delete', params)
	
// 更新排序
export const apiMpWeChatReplySort = (params: any): Promise<any> =>
	request.post('/channel.official_account_reply/sort', params)	

// 回复列表
export const apiMpWeChatReplyLists = (params: any): Promise<any> =>
    request.get('/channel.official_account_reply/lists', {params})
	
// 回复列表
export const apiMpWeChatReplyStatus = (params: any): Promise<any> =>
	request.post('/channel.official_account_reply/status', params)
/** E 回复管理 **/

