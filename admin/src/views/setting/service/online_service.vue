<template>
    <div class="admin">
        <el-card shadow="never">
            <el-alert
                title="* 设置商城客服联系信息；小程序客服在微信小程序后台开通"
                type="info"
                :closable="false"
            ></el-alert>
        </el-card>

        <el-card class="m-t-15" shadow="never">
            <el-form
                ref="formRefs"
                class="ls-form"
                :model="formData"
                :rules="rules"
                label-width="150px"
                size="small"
            >
                <el-form-item label="客服二维码：" prop="qr_code">
                    <material-select v-model="formData.qr_code" :limit="1"></material-select>
                    <div class="muted">建议尺寸：240*200，支持jpg、png格式</div>
                </el-form-item>

                <el-form-item label="客服微信号：" prop="wechat">
                    <el-input v-model="formData.wechat" placeholder="请输入微信号"></el-input>
                </el-form-item>

                <el-form-item label="客服电话：" prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入电话"></el-input>
                </el-form-item>

                <el-form-item label="服务时间：" prop="service_time">
                    <el-input v-model="formData.service_time" placeholder=""></el-input>
                    <div class="muted">服务时间，例如：周一至周六9:00-19:00</div>
                </el-form-item>
            </el-form>
        </el-card>

        <footer-btns>
            <el-button type="primary" size="small" @click="onSubmit(formRefs)">保存</el-button>
        </footer-btns>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import type { ElForm } from 'element-plus'
    import MaterialSelect from '@/components/material-select/index.vue'
    import FooterBtns from '@/components/footer-btns/index.vue'
	import { apiCustomerServiceGetConfig, apiCustomerServiceSetConfig } from '@/api/setting'
	
	
	type FormInstance = InstanceType<typeof ElForm>
    const formRefs = ref<FormInstance>()

    // 表单数据
    const formData = ref({
        qr_code: '', 		// 客服二维码
		wechat: '', 		// 客服微信号
		phone: '', 			// 客服手机号
		service_time: '', 	// 服务时间
    })

    // 表单校验规则
    const rules = reactive<object>({
        qr_code: [
            {
                required: true,
                message: '客服二维码不能为空',
                trigger: ['blur'],
            },
        ],
    })
	
	// 获取客服设置
	const getCustomerServiceConfig = async (): Promise<void> => {
		formData.value =  await apiCustomerServiceGetConfig()
	}
	
	// 设置客服设置
	const setCustomerServiceConfig = async ():Promise<void> => {
		await apiCustomerServiceSetConfig({...formData.value})
		getCustomerServiceConfig()
	}
	
	// 提交数据
	const onSubmit = (formEl: FormInstance | undefined): void => {
		if(!formEl) return
		
		formEl.validate((valid): Boolean | undefined => {
			if(!valid) return false
			setCustomerServiceConfig()
		})
	}
	
	getCustomerServiceConfig()
	
</script>

<style lang="scss" scoped>
    .el-alert.el-alert--info {
        background-color: $color-primary-light-9;
        color: $color-primary;
    }
</style>
