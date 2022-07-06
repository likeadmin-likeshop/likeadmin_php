<template>
	<div class="admin">
		<el-card shadow="never">
			<el-page-header :content="id ? '编辑管理员' : '新增管理员'" @back="$router.back()" />
		</el-card>
		<el-card v-loading="loading" shadow="never" class="m-t-15">
			<el-form ref="formRefs" :rules="rules" class="ls-form" :model="formData" label-width="150px">
				<!-- 账号输入框 -->
				<el-form-item label="账号" prop="account">
					<el-input v-model="formData.account" placeholder="请输入账号" :disabled="id && formData.root"></el-input>
				</el-form-item>
				<!-- 管理员头像 -->
				<el-form-item label="头像">
					<material-select v-model="formData.avatar" :limit="1"></material-select>
					<div class="muted">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
				</el-form-item>

				<!-- 名称输入框 -->
				<el-form-item label="名称" prop="name">
					<el-input v-model="formData.name" placeholder="请输入名称"></el-input>
				</el-form-item>

				<!-- 归属部门选择框 -->
				<el-form-item label="归属部门" prop="dept_id">
					<!-- <el-select v-model="formData.dept_id" placeholder="请选择归属部门">
						<el-option v-for="(item, index) in deptList" :key="index" :label="item.name" :value="item.id">
						</el-option>
					</el-select>-->
					<el-cascader
						v-model="formData.dept_id"
						:options="deptList"
						:props="{
							value: 'id',
							label: 'name',
							checkStrictly: true,
						}"
						clearable
					/>

					<!-- 新增 -->
					<router-link to="/organization/department" target="_blank">
						<el-button type="text" style="margin: 0 10px;">新增部门</el-button>
					</router-link>
					<el-button type="text">|</el-button>
					<el-button type="text" @click="getDeptList">刷新</el-button>
				</el-form-item>

				<!-- 岗位选择框 -->
				<el-form-item label="岗位" prop="jobs_id">
					<el-select v-model="formData.jobs_id" placeholder="请选择岗位">
						<el-option v-for="(item, index) in jobsList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>

					<!-- 新增 -->
					<router-link to="/organization/post" target="_blank">
						<el-button type="text" style="margin: 0 10px;">新增岗位</el-button>
					</router-link>
					<el-button type="text">|</el-button>
					<el-button type="text" @click="getJobsList">刷新</el-button>
				</el-form-item>

				<!-- 角色选择框 -->
				<el-form-item label="角色" prop="role_id">
					<el-select v-model="formData.role_id" placeholder="请选择角色" :disabled="id && formData.root">
						<el-option v-for="(item, index) in roleList" :key="index" :label="item.name" :value="item.id"></el-option>
					</el-select>

					<!-- 新增 -->
					<router-link to="/permission/role" target="_blank">
						<el-button type="text" style="margin: 0 10px;">新增角色</el-button>
					</router-link>
					<el-button type="text">|</el-button>
					<el-button type="text" @click="getRoleList">刷新</el-button>
				</el-form-item>

				<!-- 密码输入框 -->
				<el-form-item label="密码" prop="password">
					<el-input v-model="formData.password" show-password placeholder="请输入密码"></el-input>
				</el-form-item>

				<!-- 确认密码输入框 -->
				<el-form-item label="确认密码" prop="password_confirm">
					<el-input v-model="formData.password_confirm" show-password placeholder="请输入确认密码"></el-input>
				</el-form-item>

				<!-- 管理员状态 -->
				<el-form-item label="管理员状态">
					<el-switch
						v-model="formData.disable"
						:active-value="0"
						:inactive-value="1"
						:disabled="id && formData.root"
					/>
					<div class="muted" v-if="id && formData.root">系统管理员状态不允许关闭</div>
				</el-form-item>

				<!-- 多处登录 -->
				<el-form-item label="支持多处登录">
					<el-switch v-model="formData.multipoint_login" :active-value="1" :inactive-value="0" />
				</el-form-item>
			</el-form>
		</el-card>
		<footer-btns>
			<el-button type="primary" @click="onSubmit">保存</el-button>
		</footer-btns>
	</div>
</template>

<script lang="ts" setup>
import {
	computed,
	defineComponent,
	onMounted,
	reactive,
	Ref,
	ref,
	toRefs
} from 'vue'
import MaterialSelect from '@/components/material-select/index.vue'
import FooterBtns from '@/components/footer-btns/index.vue'
import {
	apiRoleLists,
	apiAdminDetail,
	apiAdminAdd,
	apiAdminEdit
} from '@/api/auth'
import {
	apiLeaderDept,
	apiJobsLists,
	apiDeptLists
} from '@/api/organization'
import {
	ElForm
} from 'element-plus'
import {
	useAdmin
} from '@/core/hooks/app'

const formRefs: Ref<typeof ElForm | null> = ref(null)
const {
	router,
	route
} = useAdmin()
const id = computed(() => route.query?.id)
const loading = ref(false)

const roleList: Ref<any[]> = ref([])
const deptList: Ref<any[]> = ref([])
const jobsList: Ref<any[]> = ref([])
// 表单数据
const {
	formData,
	rules
} = toRefs(
	reactive({
		formData: {
			account: '',
			name: '',
			role_id: '',
			avatar: '',
			password: '',
			password_confirm: '',
			disable: 0,
			multipoint_login: 0,
			dept_id: '',
			jobs_id: '',
		},
		rules: {
			account: [{
				required: true,
				message: '请输入账号',
				trigger: ['blur']
			}],
			name: [{
				required: true,
				message: '请输入名称',
				trigger: ['blur']
			}],
			role_id: [{
				required: true,
				message: '请选择角色',
				trigger: ['blur']
			}],
			password: [] as any[],
			password_confirm: [] as any[]
		}
	})
)

// 获取角色列表
const getRoleList = () => {
	apiRoleLists({
		page_type: 0,
	}).then((res: any) => {
		roleList.value = res.lists

		// 当编辑超级管理员时，他的role_id为0，没有相匹配的，需手动加入
		if (id.value && formData.value.root == 1) {
			roleList.value.push({
				id: 0,
				name: "系统管理员"
			})
		}
	})
}

// 获取部门联级列表
const getDeptList = () => {
	apiDeptLists()
		.then((res: any) => {
			// console.log(res.lists, 'res.lists')

			deptList.value = isDisabled(res)
		})
}

// 判断是否禁用， 添加禁用字段disabled
const isDisabled = (treeArr: Array) => {
	let newTree = treeArr.map((item) => {

		const children = item.children || []
		if (children.length) isDisabled(children)

		if (item.status == 0) {
			item.disabled = true
		} else {
			item.disabled = false
		}
		return item
	})
	return newTree
}

// 获取岗位列表
const getJobsList = () => {
	apiJobsLists({
		page_type: 0
	}).then((res: any) => {
		jobsList.value = res.lists
	})
}

const getAdminDetail = () => {
	if (!id.value) {
		rules.value.password = [{
			required: true,
			message: '请输入密码',
			trigger: ['blur']
		}]
		rules.value.password_confirm = [{
			required: true,
			message: '请输入确认密码',
			trigger: ['blur']
		}]
		return
	}
	loading.value = true
	apiAdminDetail({
		id: id.value
	})
		.then((res: any) => {
			formData.value = res
			res.jobs_id == 0 ? formData.value.jobs_id = '' : ''
		})
		.finally(() => {
			loading.value = false
		})
}

const onSubmit = () => {
	formRefs.value?.validate((valid: boolean) => {
		if (!valid) {
			return
		}
		// 因为组件绑定的pid是number，会匹配对应的联级数据
		// 而选中后，pid是变为数组
		// 所以pid是数组时（即新建部门或者编辑部门改变上级部门）
		if (Array.isArray(formData.value.dept_id)) {
			formData.value.dept_id = formData.value.dept_id[formData.value.dept_id.length - 1]
		}

		const promise = id.value ?
			apiAdminEdit({
				...formData.value,
				id: id.value
			}) :
			apiAdminAdd(formData.value)
		promise.then(() => {
			setTimeout(() => router.go(-1), 500)
		})
	})
}

onMounted(() => {
	getAdminDetail()
	getRoleList()
	getDeptList()
	getJobsList()
})
</script>

<style lang="scss" scoped></style>
