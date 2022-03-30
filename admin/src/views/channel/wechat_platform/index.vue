<!-- 微信开放平台 -->
<template>
	<!-- Main Form Start -->
	<el-form :rules="formRules" ref="formRef" :model="form" label-width="140px" size="small">
		<!-- 微信开放平台 -->
		<el-card shadow="never" class="m-t-16">
			<template #header>微信开放平台</template>
			<!-- 提示 -->
			<div class="ls-card-alert">
				<el-alert
					title="APP需要使用微信授权登录、微信支付等微信生态能力时，需要设置关联微信开发平台；请填写APP在微信开发平台申请的应用ID等信息。"
					type="primary"
					:closable="false"
					show-icon
				/>
			</div>
			<el-form-item label="AppID" prop="app_id">
				<el-input class="ls-input m-r-10" size="small" v-model="form.app_id"></el-input>
			</el-form-item>
			<el-form-item label="AppSecret" prop="app_secret">
				<el-input class="ls-input m-r-10" size="small" v-model="form.app_secret"></el-input>
			</el-form-item>
		</el-card>
	</el-form>
	<!-- Main Form End -->

	<!-- Footer Start -->
	<footer-btns>
		<el-button type="primary" size="small" @click="onSubmit(formRef)">保存</el-button>
	</footer-btns>
	<!-- Footer End -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
	apiWechatPlatformGet,
	apiWechatPlatformSet
} from '@/api/channel/wechat_platform'
import { AppSettings_Req } from '@/api/channel/app_store.d.ts'
import type { ElForm } from "element-plus";
import FooterBtns from '@/components/footer-btns/index.vue'

/** Interface Start **/
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>();
/** Interface Start **/

/** Data Start **/
const form = ref<AppSettings_Req>({
	app_id: '', // 开放平台appid
	app_secret: '' // 开放平台appSecrets
})

// 表单验证
const formRules = reactive<object>({
	app_id: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	app_secret: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
})
/** Data End **/

/** Methods Start **/
// 获取微信公众平台配置
const getAppSettings = async (): Promise<void> => {
	form.value = await apiWechatPlatformGet()
}
// 编辑微信公众平台配置
const handleAppStoreEdit = async (): Promise<void> => {
	await apiWechatPlatformSet({ ...form.value })
	getAppSettings()
}
// 提交数据
const onSubmit = (formEl: FormInstance | undefined): void => {
	if (!formEl) return
	formEl.validate((valid): boolean | undefined=> {
		if (!valid) return false
		handleAppStoreEdit()
	})
}
/** Methods End **/

/** LifeCycle Start **/
getAppSettings()
/** LifeCycle End **/
</script>

<style lang="scss" scoped>
.ls-input {
	width: 280px;
}

.ls-card-alert {
	border-radius: 8px;
	background-color: #ffffff;
	padding: 0 24px 24px 24px;
	flex: 1;
}
</style>
