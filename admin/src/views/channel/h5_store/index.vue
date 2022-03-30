<!-- H5 -->
<template>
	<!-- Main Form Start -->
	<el-form ref="formRef" :model="formData" label-width="140px" size="small">
		<!-- 微信小程序 -->
		<el-card shadow="never" class="ls-card m-t-16">
			<el-form-item label="H5状态">
				<!-- switch开关 -->
				<div class="flex col-center">
					<el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
					<span class="m-l-16">{{ formData.status ? '开启' : '关闭' }}</span>
				</div>
				<div class="muted xs m-r-16">渠道状态为关闭时，将不对外提供服务，请谨慎操作</div>
			</el-form-item>
			<el-form-item label="访问链接">
				<el-input class="ls-input m-r-10" v-model="formData.url" disabled></el-input>
				<el-button v-on:copy="formData.url">复制</el-button>
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
	apiH5Settings,
	apiH5SettingsSet
} from '@/api/channel/h5_store'
import FooterBtns from '@/components/footer-btns/index.vue'

/** Interface Start **/
interface formDataObj {
	status?: number | string  // 状态 0-关闭 1-开启
	url: string								// 访问链接
}
/** Interface End **/

/** Data Start **/
const formData = ref<formDataObj>({
	status: 1, 
	url: '', 		
})
/** Data End **/

/** Methods Start **/
// 获取H5设置
const getH5Settings = async (): Promise<void> => {
	formData.value = await apiH5Settings()
}
// 修改H5设置
const onSubmit = async (): Promise<void> => {
	await apiH5SettingsSet({ status: formData.value.status })
	getH5Settings()
}
/** Methods End **/

/** LifeCycle Start **/
getH5Settings()
/** LifeCycle End **/
</script>

<style lang="scss" scoped>
.ls-input {
	width: 280px;
}
</style>
