<!-- APP商城 -->
<template>
	<!-- Main Form Start -->
	<el-form ref="formRef" :model="formData" label-width="140px" size="small">
		<!-- APP 下载 -->
		<el-card shadow="never" class="m-t-16">
			<template #header>APP下载</template>
			<!-- 提示 -->
			<div class="ls-card-alert">
				<el-alert
					class="xs"
					title="苹果APP可通过上架APP至苹果App Store获取下载链接；安卓APP可通过上架APP至应用宝获取下载链接；下载链接也可使用蒲公英等分发渠道的链接。"
					type="primary"
					:closable="false"
					show-icon
				/>
			</div>
			<el-form-item label="苹果APP下载链接">
				<el-input class="ls-input m-r-10" v-model="formData.ios_download_url"></el-input>
			</el-form-item>
			<el-form-item label="安卓APP下载链接">
				<el-input class="ls-input m-r-10" v-model="formData.android_download_url"></el-input>
			</el-form-item>
			<el-form-item label="APP下载引导文案">
				<el-input class="ls-input m-r-10" v-model="formData.download_title"></el-input>
				<div class="muted xs m-r-16">分享APP页面打开后，H5页面顶部会显示APP下载引导文案</div>
			</el-form-item>
		</el-card>
	</el-form>
	<!-- Main Form End -->

	<!-- Footer Start -->
	<footer-btns>
		<el-button type="primary" size="small" @click="onSubmit">保存</el-button>
	</footer-btns>
	<!-- Footer End -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
	apiAppSettings,
	apiAppSettingsSet
} from '@/api/channel/app_store'
import { AppSettings_Req } from '@/api/channel/app_store.d.ts'
import FooterBtns from '@/components/footer-btns/index.vue'

/** Data Start **/
const formData = ref<AppSettings_Req>({
	ios_download_url: '', // 苹果APP下载链接
	android_download_url: '', // 安卓APP下载链接
	download_title: '', // APP下载引导文案
})
/** Data End **/

/** Methods Start **/
// 获取APP配置
const getAppSettings = async (): Promise<void> => {
	formData.value = await apiAppSettings()
}
// 编辑App配置
const handleAppStoreEdit = async (): Promise<void> => {
	await apiAppSettingsSet({ ...formData.value })
	getAppSettings()
}
// 提交数据
const onSubmit = (): void => {
	handleAppStoreEdit()
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
