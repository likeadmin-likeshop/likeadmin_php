<!-- 存储设置编辑 -->
<template>
	<div class="storage-setting">
		<!-- 导航头部 -->
		<el-card shadow="never">
			<el-page-header @back="$router.go(-1)" content="存储设置" />
		</el-card>

		<!-- 提示 -->
		<el-card shadow="never" class="m-t-15" v-if="engine !== storage.LOCAL">
			<el-alert v-if="engine == storage.QINIU" title="温馨提示：切换七牛云存储后，素材库需要重新上传至七牛云。" type="primary" :closable="false"
				show-icon />
			<el-alert v-if="engine == storage.ALIYUN" title="温馨提示：切换阿里云OSS后，素材库需要重新上传至阿里云OSS。" type="primary"
				:closable="false" show-icon />
			<el-alert v-if="engine == storage.QCLOUD" title="温馨提示：切换腾讯云OSS后，素材库需要重新上传至腾讯云OSS。" type="primary"
				:closable="false" show-icon />
		</el-card>

		<!-- 表单 -->
		<el-card shadow="never" class="m-t-15">
			<el-form ref="formRef" :model="form" :rules="formRules" label-width="240px" size="small" class="ls-form">
				<!-- 存储设置 -->
				<div class="card-content m-t-24">
					<el-form-item label="存储方式">
						<div v-if="engine === storage.LOCAL">本地存储</div>
						<div v-if="engine === storage.QINIU">七牛云存储</div>
						<div v-if="engine === storage.ALIYUN">阿里云OSS</div>
						<div v-if="engine === storage.QCLOUD">腾讯云OSS</div>
						<div v-if="engine === storage.LOCAL" class="muted xs m-r-16">
							本地存储方式不需要配置其他参数
						</div>
					</el-form-item>
				</div>
				<div v-if="engine !== 'local'">
					<el-form-item label=" 存储空间名称(Bucket)" prop="bucket">
						<el-input v-model="form.bucket" placeholder="请输入存储空间名称(Bucket)"></el-input>
					</el-form-item>
					<el-form-item label="ACCESS_KEY（AK）" prop="access_key">
						<el-input v-model="form.access_key" placeholder="请输入ACCESS_KEY"></el-input>
					</el-form-item>
					<el-form-item label="SECRET_KEY（SK）" prop="secret_key">
						<el-input v-model="form.secret_key" placeholder="请输入SECRET_KEY"></el-input>
					</el-form-item>
					<el-form-item label="空间域名（Domain）" prop="domain">
						<!-- <el-select class="ls-select" v-model="form" placeholder="https://">
							<el-option label="https://" value="https://"></el-option>
							<el-option label="http://" value="http://"></el-option>
						</el-select> -->
						<el-input v-model="form.domain" placeholder="请输入空间域名"></el-input>
						<div class="muted xs m-r-16">
							请补全http://或https://，例如https://static.cloud.com
						</div>
					</el-form-item>
					<el-form-item v-if="engine == storage.QCLOUD" label="REGION" prop="region">
						<el-input v-model="form.region" placeholder="请输入region"></el-input>
					</el-form-item>
				</div>
				<el-form-item label="状态" prop="status">
					<el-radio-group class="m-r-16" v-model="form.status">
						<el-radio :label="0">停用·</el-radio>
						<el-radio :label="1">启用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
		</el-card>

		<!--  保存  -->
		<footer-btns>
			<el-button type="primary" size="small" @click="onSubmit">保存</el-button>
		</footer-btns>
	</div>
</template>

<script lang="ts" setup>
	import {
		apiStorageDetail,
		apiStorageSetup
	} from '@/api/setting'
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		ElForm
	} from 'element-plus'
	import {
		useAdmin
	} from '@/core/hooks/app'
	import FooterBtns from '@/components/footer-btns/index.vue'
	import { storage } from '@/utils/type'

	/** S Data **/
	const {
		route,
		router
	} = useAdmin()

	// 存储方式
	let engine = ref < string > ('') // 存储引擎名称：local-本地，qiniu-七牛云,aliyun-阿里云OSS,qcloud-腾讯云OS:
	// 设置表单
	let form = ref < object > ({
		bucket: '',
		access_key: '',
		secret_key: '',
		domain: '',
		region: '', // 腾讯云需要
		status: 0
	})

	let formRules = ref({
		bucket: [{
			required: true,
			message: '请输入存储空间名称',
			trigger: 'blur'
		}],
		access_key: [{
			required: true,
			message: '请输入ACCESS_KEY',
			trigger: 'blur'
		}],
		secret_key: [{
			required: true,
			message: '请输入SECRET_KEY',
			trigger: 'blur'
		}],
		domain: [{
			required: true,
			message: '请输入空间域名',
			trigger: 'blur'
		}],
		region: [{
			required: true,
			message: '请输入REGION',
			trigger: 'blur'
		}]
	})

	const formRef: Ref < typeof ElForm | null > = ref(null)
	/** E Data **/

	/** S Methods **/
	const onSubmit = () => {
		// 验证表单格式是否正确
		formRef.value?.validate((valid: boolean) => {
			if (!valid) {
				return
			}
			// 请求发送
			apiStorageSetup({
					...form.value,
					engine: engine.value,
				})
				.then((res: any) => {
					setTimeout(() => router.back(), 500)
				})
				.catch((err: any) => {
					console.log('err', err)
				})
		})
	}

	// 获取引擎配置
	const getStorageDetail = async () => {
		form.value = await apiStorageDetail({
			engine: engine.value
		})
	}
	/** E Methods **/

	/** S Life Cycle **/
	onMounted(async () => {
		if (route.query.engine) {
			console.log('route.query.engine', route.query.engine)
			engine.value = route.query.engine
		}
		await getStorageDetail()
	})
	/** E Life Cycle **/
</script>

<style lang="scss" scoped>
</style>
