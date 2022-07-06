<!-- 新增/编辑-->
<template>
	<!-- Header Start -->
	<el-card shadow="never">
		<el-page-header
			v-if="formData.reply_type == 1"
			@back="$router.back()"
			:content="mode === 'add' ? '新增关注回复' : '编辑关注回复'"
		/>
		<el-page-header
			v-if="formData.reply_type == 2"
			@back="$router.back()"
			:content="mode === 'add' ? '新增关键字回复' : '编辑关键字回复'"
		/>
		<el-page-header
			v-if="formData.reply_type == 3"
			@back="$router.back()"
			:content="mode === 'add' ? '新增默认回复' : '编辑默认回复'"
		/>
	</el-card>
	<!-- Header End -->

	<!-- Main Start -->
	<el-form :rules="rules" ref="formRef" :model="formData" label-width="120px">
		<el-card shadow="never" class="m-t-16">
			<div class="card-title">关注回复</div>
			<div class="card-content m-t-24">
				<el-form-item label="规则名称" prop="name">
					<el-input class="ls-input" v-model="formData.name" placeholder="请输入规则名称"></el-input>
					<div class="muted xs">方便通过名称管理关注回复内容</div>
				</el-form-item>
				<el-form-item v-if="formData.reply_type == 2" label="关键词" prop="keyword">
					<el-input class="ls-input" v-model="formData.keyword" placeholder="请输入关键词"></el-input>
				</el-form-item>
				<el-form-item v-if="formData.reply_type == 2" label="排序值" prop="sort">
					<el-input class="ls-input" v-model.number="formData.sort" placeholder="请输入排序值"></el-input>
					<div class="muted xs">关键词排序值</div>
				</el-form-item>
				<el-form-item v-if="formData.reply_type == 2" label="匹配方式" prop="matching_type">
					<el-select class="ls-select" v-model="formData.matching_type" placeholder="请选择匹配方式">
						<el-option label="全匹配" :value="1"></el-option>
						<el-option label="模糊匹配" :value="2"></el-option>
					</el-select>
					<div class="muted xs">模糊匹配时，关键词部分匹配用户输入的内容即可</div>
				</el-form-item>
				<el-form-item label="内容类型" prop="content_type">
					<el-select class="ls-select" v-model="formData.content_type" placeholder="请选择内容类型">
						<el-option label="文本" :value="1"></el-option>
					</el-select>
					<div class="muted xs">暂时支持文本类型</div>
				</el-form-item>
				<el-form-item label="回复内容" prop="content">
					<el-input
						class="ls-input-textarea"
						v-model="formData.content"
						placeholder="请输入回复内容"
						type="textarea"
						:rows="6"
					></el-input>
				</el-form-item>
				<el-form-item label="启用状态">
					<div class="flex col-center">
						<el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">{{ formData.status ? '开启' : '关闭' }}</span>
					</div>
				</el-form-item>
			</div>
		</el-card>
	</el-form>
	<!-- Main End -->

	<!-- Footer Start -->
	<footer-btns>
		<el-button @click="$router.back()">取消</el-button>
		<el-button type="primary" @click="onSubmit(formRef)">保存</el-button>
	</footer-btns>
	<!-- Footer End -->
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import {
	PageMode
} from '@/utils/type'
import {
	apiMpWeChatReplyAdd,
	apiMpWeChatReplyEdit,
	apiMpWeChatReplyDetail
} from "@/api/channel/mp_wechat"
import FooterBtns from '@/components/footer-btns/index.vue'
import { useAdmin } from '@/core/hooks/app'
import type { ElForm } from "element-plus";

/** Interface Start **/
interface formDataObj {
	reply_type?: string | boolean | number
	name: string | null
	content_type: number
	content: string
	status: number
	keyword: string
	matching_type: number
	sort: string | number
	reply_num: number
}

type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>();
/** Interface End **/

/** Data Start **/
const { router, route } = useAdmin()
const mode = ref<string>(PageMode['ADD']) // 当前页面【add: 添加用户等级 | edit: 编辑用户等级】
const identity = ref(route.query.id as string) // 当前编辑回复ID  valid: mode = 'edit'
let formData = ref<formDataObj>({
	reply_type: route.query.replyType as string, // 回复类型 1-关注回复 2-关键词回复 3-默认回复
	name: '', // 规格名称
	content_type: 1, // 内容类型 1-文本
	content: '', // 内容
	status: 1, // 启用状态 0-禁用 1-开启
	keyword: '', // 关键词 *关键词回复必填
	matching_type: 1, // 匹配方式 1-全匹配 2-模糊匹配 *关键词回复必填
	sort: '', // 排序值 *关键词回复必填 
	reply_num: 1, // 回复数量 *关键词回复必填 1-回复匹配首条
})
const rules = reactive<object>({
	name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
	keyword: [{ required: true, message: '请输入关键词', trigger: 'blur' }],
	sort: [
		{ required: true, message: '请输入排序值', trigger: 'blur' },
		{ type: 'number', min: 1, message: '请输入大于0的数字值', trigger: 'blur' }
	],
	matching_type: [{ required: true, message: '请选择匹配方式', trigger: 'change' }],
	content_type: [{ required: true, message: '请选择内容类型', trigger: 'change' }],
	content: [{ required: true, message: '请输入回复内容', trigger: 'blur' }]
})
/** Data End **/

/** Methods Start **/
// 表单提交
const onSubmit = (formEl: FormInstance | undefined): void => {
	if (!formEl) return
	formEl.validate((valid): boolean | Promise<void> | undefined => {
		if (!valid) return false
		switch (mode.value) {
			case PageMode['ADD']:
				return handleMpWeChatReplyAdd()
			case PageMode['EDIT']:
				return handleMpWeChatReplyEdit()
		}
	})
}
// 新增
const handleMpWeChatReplyAdd = async (): Promise<void> => {
	await apiMpWeChatReplyAdd(formData.value)
	setTimeout(() => router.go(-1), 500)
}
// 编辑
const handleMpWeChatReplyEdit = async (): Promise<void> => {
	apiMpWeChatReplyEdit({ ...formData.value, id: identity.value })
	setTimeout(() => router.go(-1), 500)
}
// 表单初始化数据 [编辑模式] mode => edit
const initMpWeChatReplyDetail = async (): Promise<void> => {
	formData.value = await apiMpWeChatReplyDetail({ id: identity.value })
}
/** Methods Start **/

/** Life Cycle Start **/
// 编辑模式：初始化数据
if (route.query.mode === PageMode['EDIT']) {
	mode.value = PageMode['EDIT']
	initMpWeChatReplyDetail()
}
/** Life Cycle End **/
</script>

<style lang="scss" scoped>
.ls-input,
.ls-select {
	width: 300px;
}

.ls-input-textarea {
	width: 300px;
}

.card-title {
	font-size: 14px;
	font-weight: 500;
}
</style>
