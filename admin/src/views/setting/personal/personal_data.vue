<!-- 个人资料 -->
<template>
    <div class="personal-data">
        <el-card class="m-t-15" shadow="never">
            <el-form
                ref="formRefs"
                class="ls-form"
                :model="formData"
                :rules="rules"
                label-width="150px"
                size="small"
            >
                <el-form-item label="头像：" prop="avatar">
                    <material-select v-model="formData.avatar" :limit="1"></material-select>
                    <!-- <div class="muted">建议尺寸：240*200，支持jpg、png格式</div> -->
                </el-form-item>

                <el-form-item label="账号：" prop="account">
                    <el-input v-model="formData.account" placeholder="" disabled></el-input>
                </el-form-item>

                <el-form-item label="名称：" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
                </el-form-item>

                <el-form-item label="当前密码：" prop="password_old">
                    <el-input v-model.trim="formData.password_old" placeholder="修改密码时必填, 不修改密码时留空" type="password" show-password></el-input>
                </el-form-item>
				
				<el-form-item label="新的密码：" prop="password">
				    <el-input v-model.trim="formData.password" placeholder="修改密码时必填, 不修改密码时留空" type="password" show-password></el-input>
				</el-form-item>
				
				<el-form-item label="确定密码：" prop="password_confirm">
				    <el-input v-model.trim="formData.password_confirm" placeholder="修改密码时必填, 不修改密码时留空" type="password" show-password></el-input>
				</el-form-item>
            </el-form>
        </el-card>

        <footer-btns>
            <el-button type="primary" size="small" @click="onSubmit(formRefs)">保存</el-button>
        </footer-btns>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, onMounted } from 'vue'
    import type { ElForm } from 'element-plus'
    import MaterialSelect from '@/components/material-select/index.vue'
    import FooterBtns from '@/components/footer-btns/index.vue'
	import { apiAuthAdminEditSelf, apiAuthAdminMySelf } from '@/api/setting'
	import { ElMessage } from 'element-plus'
	import { useAdmin } from '@/core/hooks/app'
	
	const { store } = useAdmin()
	type FormInstance = InstanceType<typeof ElForm>
    const formRefs = ref<FormInstance>()

    // 表单数据
    const formData = ref({
		avatar: '', 			// 头像
		account: '',        	// 账号
		name: '', 				// 名称
		password_old: '', 		// 当前密码
		password: '', 			// 新的密码
		password_confirm: '', 	// 确定密码
    })

    // 表单校验规则
    const rules = reactive<object>({
		avatar: [
		    {
		        required: true,
		        message: '头像不能为空',
		        trigger: ['change'],
		    },
		],
        name: [
            {
                required: true,
                message: '请输入名称',
                trigger: ['blur'],
            },
        ],
    })
	
	// 获取个人设置
	const getAuthAdminMySelf = async (): Promise<void> => {
		formData.value =  await apiAuthAdminMySelf()
	}
	
	// 设置个人设置
	const setAuthAdminEditSelf = async ():Promise<void> => {
		if(formData.value.password_old || formData.value.password || formData.value.password_confirm) {
			if(!formData.value.password_old) {
				return ElMessage({ type: 'error', message: '请输入当前密码' })
			}
			
			if(!formData.value.password) {
				return ElMessage({ type: 'error', message: '请输入新的密码' })
			}
			
			if(!formData.value.password_confirm) {
				return ElMessage({ type: 'error', message: '请输入确定密码' })
			}
			
			if(formData.value.password_confirm != formData.value.password) {
				return ElMessage({ type: 'error', message: '两次输入的密码不一样' })
			}
		}
		
		if(formData.value.password_old && formData.value.password && formData.value.password_confirm) {
			if(formData.value.password_old.length < 6 ||  formData.value.password_old.length > 32) {
				return ElMessage({ type: 'error', message: '密码长度在6到32之间' })
			}
			if(formData.value.password.length < 6 ||  formData.value.password.length > 32) {
				return ElMessage({ type: 'error', message: '密码长度在6到32之间' })
			}
			if(formData.value.password_confirm.length < 6 ||  formData.value.password_confirm.length > 32) {
				return ElMessage({ type: 'error', message: '密码长度在6到32之间' })
			}
		}
		
		await apiAuthAdminEditSelf({...formData.value})
		getAuthAdminMySelf()
		store.dispatch('user/getUser')
	}
	
	// 提交数据
	const onSubmit = (formEl: FormInstance | undefined): void => {
		if(!formEl) return
		
		formEl.validate((valid): Boolean | undefined => {
			if(!valid) return false
			setAuthAdminEditSelf()
		})
	}
	
	onMounted(() => {
		getAuthAdminMySelf()
	})
</script>

<style lang="scss" scoped>
</style>
