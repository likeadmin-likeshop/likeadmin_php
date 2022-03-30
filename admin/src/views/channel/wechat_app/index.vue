<!-- 微信小程序 -->
<template>
	<!-- Header Alert Start -->
	<el-card shadow="never">
		<el-alert title="温馨提示：请先前往微信小程序后台申请认证微信小程序。" type="primary" :closable="false" show-icon />
	</el-card>
	<!-- Header Alert End -->

	<!-- Main Form Start -->
	<el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" size="small">
		<!-- 微信小程序 Start -->
		<el-card shadow="never" class="m-t-16">
			<template #header>微信小程序</template>

			<el-form-item label="小程序名称">
				<el-input class="ls-input" v-model="formData.name" size="small"></el-input>
			</el-form-item>
			<el-form-item label="原始ID">
				<el-input class="ls-input" v-model="formData.original_id" size="small"></el-input>
			</el-form-item>
			<el-form-item label="小程序码">
				<material-select :limit="1" v-model="formData.qr_code" />
				<div class="muted xs m-r-16">建议尺寸：400*400像素，支持jpg，jpeg，png格式</div>
			</el-form-item>
		</el-card>
		<!-- 微信小程序 End -->

		<!-- 开发者ID Start -->
		<el-card shadow="never" class="m-t-16">
			<template #header>开发者ID</template>
			<el-form-item label="AppID" prop="app_id">
				<el-input class="ls-input" v-model="formData.app_id" size="small"></el-input>
			</el-form-item>
			<el-form-item label="AppSecret" prop="app_secret">
				<el-input class="ls-input" v-model="formData.app_secret" size="small"></el-input>
				<div class="muted xs m-r-16">小程序账号登录微信公众平台，点击开发>开发设置->开发者ID，设置AppID和AppSecret</div>
			</el-form-item>
		</el-card>
		<!-- 开发者ID End -->

		<!-- 服务器域名 Start -->
		<el-card shadow="never" class="m-t-16">
			<template #header>服务器域名</template>
			<el-form-item label="request合法域名">
				<el-input class="ls-input m-r-10" v-model="formData.request_domain" size="small" disabled></el-input>
				<el-button size="small" v-on:copy="formData.request_domain">复制</el-button>
				<div class="muted xs m-r-16">小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写https协议域名</div>
			</el-form-item>
			<el-form-item label="socket合法域名">
				<el-input class="ls-input m-r-10" v-model="formData.socket_domain" size="small" disabled></el-input>
				<el-button size="small" v-on:copy="formData.socket_domain">复制</el-button>
				<div class="muted xs m-r-16">小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写wss协议域名</div>
			</el-form-item>
			<el-form-item label="uploadFile合法域名">
				<el-input class="ls-input m-r-10" v-model="formData.upload_file_domain" size="small" disabled></el-input>
				<el-button size="small" v-on:copy="formData.upload_file_domain">复制</el-button>
				<div class="muted xs m-r-16">小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写https协议域名</div>
			</el-form-item>
			<el-form-item label="downloadFile合法域名">
				<el-input class="ls-input m-r-10" v-model="formData.download_file_domain" size="small" disabled></el-input>
				<el-button size="small" v-on:copy="formData.download_file_domain">复制</el-button>
				<div class="muted xs m-r-16">小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写https协议域名</div>
			</el-form-item>
			<el-form-item label="udp合法域名">
				<el-input class="ls-input m-r-10" v-model="formData.udp_domain" size="small" disabled></el-input>
				<el-button size="small" v-on:copy="formData.udp_domain">复制</el-button>
				<div class="muted xs m-r-16">小程序账号登录微信公众平台，点击开发>开发设置->服务器域名，填写udp协议域名</div>
			</el-form-item>
		</el-card>
		<!-- 服务器域名 End -->

		<!-- 业务域名 Start -->
		<el-card shadow="never" class="m-t-16">
			<template #header>业务域名</template>
			<el-form-item label="业务域名">
				<el-input class="ls-input m-r-10" v-model="formData.business_domain" size="small" disabled></el-input>
				<el-button size="small" v-on:copy="formData.business_domain">复制</el-button>
				<div class="muted xs m-r-16">小程序账号登录微信公众平台，点击开发>开发设置->业务域名，填写业务域名</div>
			</el-form-item>
		</el-card>
		<!-- 业务域名 End -->
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
import MaterialSelect from '@/components/material-select/index.vue'
import FooterBtns from '@/components/footer-btns/index.vue'
import {
	apiWechatMiniSetting,
	apiWechatMiniSettingSet
} from '@/api/channel/wechat_app'
import {
	WechatMiniSetting_Res,
	WechatMiniSetting_Req
} from '@/api/channel/wechat_app.d'
import type { ElForm } from "element-plus";

type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>();

/** S Data **/
const formData = ref<WechatMiniSetting_Res>({
	name: '', // 小程序名称
	original_id: '', // 原始id
	qr_code: '', // 二维码
	app_id: '',
	app_secret: '',
	request_domain: '', // request合法域名
	socket_domain: '', // socket合法域名
	upload_file_domain: '', // uploadFile合法域名
	download_file_domain: '', // downloadFile合法域名
	udp_domain: '', // udp合法域名
	business_domain: '', // 业务域名
	url: '',
	token: '',
	encoding_aes_key: '',
	encryption_type: 1, // 消息加密方式 1-明文模式 2-兼容模式 3-安全模式
	data_format: 1 // 数据格式 1-JSON 2-XML
})
// 表单验证
const rules = reactive<object>({
	app_id: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	app_secret: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
})
/** Data End **/

/** Methods Start **/
// 获取小程序配置
const getWechatAppSetting = async (): Promise<void> => {
	formData.value = await apiWechatMiniSetting()
}
// 编辑小程序配置
const handleWechatAppEdit = async (): Promise<void> => {
	await apiWechatMiniSettingSet({ ...formData.value })
	getWechatAppSetting()
}
// 提交数据
const onSubmit = (formEl: FormInstance | undefined): void => {
	if (!formEl) return
	formEl.validate((valid): boolean | undefined => {
		if (!valid) return false
		handleWechatAppEdit()
	})
}
/** Methods End **/

/** LifeCycle Start **/
getWechatAppSetting()
/** LifeCycle End **/
</script>

<style lang="scss" scoped>
.ls-input {
	width: 280px;
}
</style>
