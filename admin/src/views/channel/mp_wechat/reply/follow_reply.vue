<template>
	<!-- Header Alert Start -->
	<el-card shadow="never">
		<el-alert
			class="xxl"
			title="温馨提示：1.粉丝关注公众号时，会自动发送启用的关注回复；2.同时只能启用一个关注回复。"
			type="primary"
			:closable="false"
			show-icon
		></el-alert>
	</el-card>
	<!-- Header Alert End -->

	<el-card shadow="never" class="m-t-20">
		<!-- Header BtnGroup Start -->
		<el-button size="small" type="primary" @click="onReplyAdd()">新增关注回复</el-button>
		<!-- Header BtnGroup Start -->

		<!-- Main TableData Start -->
		<div class="m-t-16">
			<el-table
				:data="pager.lists"
				style="width: 100%"
				v-loading="pager.loading"
				:default-sort="{ prop: 'level', order: 'ascending' }"
				:header-cell-style="{ 'background': '#f5f8ff' }"
				size="mini"
			>
				<el-table-column prop="name" label="规则名称" min-width="100px"></el-table-column>
				<el-table-column prop="content_type_desc" label="回复类型" min-width="100px"></el-table-column>
				<el-table-column prop="status" label="启用状态" min-width="100px">
					<template #default="scope">
						<el-switch
							v-model="scope.row.status"
							:active-value="1"
							:inactive-value="0"
							@change="putMpWeChatReplyStatus(scope.row)"
						/>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" min-width="120px">
					<template #default="scope">
						<!-- <el-button type="text" size="small" @click="onUserLevelEdit(scope.row)">详情</el-button> -->
						<el-button type="text" size="small" @click="onReplyEdit(scope.row)">编辑</el-button>
						<popup class="m-l-10 inline" @confirm="onMpWeChatReplyDelete(scope.row)">
							<el-button type="text" size="small" slot="trigger">删除</el-button>
						</popup>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- Main TableData End -->

		<!-- Footer Pagination Start -->
		<div class="flex row-right">
			<pagination v-model="pager" @change="requestApi" layout="total, prev, pager, next, jumper" />
		</div>
		<!-- Footer Pagination End -->
	</el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import {
	apiMpWeChatReplyLists,
	apiMpWeChatReplyDelete,
	apiMpWeChatReplyStatus
} from "@/api/channel/mp_wechat"
import { PageMode } from "@/utils/type"
import Popup from "@/components/popup/index.vue"
import { useAdmin } from "@/core/hooks/app"
import { usePages } from "@/core/hooks/pages";
import Pagination from "@/components/pagination/index.vue"

/** Data Start **/
const { router } = useAdmin();
let formData = ref({ reply_type: '1' as string | undefined | number }) // 回复类型 1-关注回复 2-关键词回复 3-默认回复
const {
	pager,
	requestApi
} = usePages({
	callback: apiMpWeChatReplyLists,
	params: formData.value
});

/** Data End **/

/** S Methods **/
// 新增用户等级
const onReplyAdd = (): void => {
	router.push({
		path: "/channel/mp_wechat/reply/reply_edit",
		query: {
			mode: PageMode["ADD"],
			replyType: formData.value.reply_type,
		},
	});
}
// 编辑
const onReplyEdit = (event: Event | any): void => {
	router.push({
		path: "/channel/mp_wechat/reply/reply_edit",
		query: {
			mode: PageMode["EDIT"],
			id: event.id,
			replyType: formData.value.reply_type,
		},
	});
}
// 修改状态
const putMpWeChatReplyStatus = async (event: Event | any): Promise<void> => {
	await apiMpWeChatReplyStatus({ id: event.id as number })
	requestApi();
}
// 删除
const onMpWeChatReplyDelete = async (event: Event | any): Promise<void> => {
	await apiMpWeChatReplyDelete({ id: event.id as number })
	requestApi();
}
/** Methods End **/

/** Life Cycle Start **/
requestApi();
	/** Life Cycle End **/
</script>

<style lang="scss" scoped>
</style>
