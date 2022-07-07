<template>
	<el-card shadow="never">
		<el-form class="ls-form" :model="formData" label-width="80px" inline>
			<el-form-item label="部门名称">
				<el-input v-model="formData.name" class="ls-input" />
			</el-form-item>
			<el-form-item label="部门状态：">
				<el-select v-model="formData.status" placeholder="全部">
					<el-option v-for="item in statusList" :key="item.val" :label="item.name" :value="item.val"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<div class="m-l-20">
					<el-button type="primary" @click="getLists">查询</el-button>
					<el-button @click="reGetLists">重置</el-button>
				</div>
			</el-form-item>
		</el-form>
	</el-card>
	<el-card v-loading="loading" class="m-t-15" shadow="never">
		<router-link v-perms="['dept.dept/add']" to="/organization/department/edit">
			<el-button type="primary">新增部门</el-button>
		</router-link>
		<el-button type style="margin-left: 16px;" @click="openOrFold()">全部展开/折叠</el-button>
		<div class="m-t-15">
			<el-table :data="lists" row-key="id" :expand-row-keys="openIdArr">
				<el-table-column label="部门名称" prop="name" min-width="100"></el-table-column>
				<el-table-column label="部门状态" prop="status_desc" min-width="100">
					<template #default="{ row }">
						<el-tag class="ml-2" :type="row.status ? '' : 'danger'">{{ row.status_desc }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="排序" prop="sort" min-width="100"></el-table-column>
				<el-table-column label="添加时间" prop="create_time" min-width="100"></el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template #default="{ row }">
						<router-link
							v-perms="['dept.dept/edit']"
							class="m-r-10"
							:to="{
								path: '/organization/department/edit',
								query: {
									id: row.id
								}
							}"
						>
							<el-button type="text">编辑</el-button>
						</router-link>
						<popup
							v-perms="['dept.dept/delete']"
							class="m-r-10 inline"
							@confirm="handleDelete(row.id)"
							v-show="row.pid"
						>
							<template #trigger>
								<el-button type="text">删除</el-button>
							</template>
						</popup>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
import {
	defineComponent,
	onMounted,
	reactive,
	Ref,
	ref
} from 'vue'
import Popup from '@/components/popup/index.vue'
import {
	apiDeptLists,
	apiDeptDelete
} from '@/api/organization'
import {
	flatten
} from '@/utils/util'

// 表单数据
const formData = reactive({
	name: '',
	status: ''
})

// 展开列表数组
let openIdArr = ref<Array<Number>>([])

// 列表数据
let lists = ref<Array<any>>([])

// 加载动画
let loading = ref<Boolean>(false)

// 状态列表
const statusList = [{
	name: '正常',
	val: '1',
},
{
	name: '停用',
	val: '0',
},
]

// 重置列表
const reGetLists = () => {
	formData.name = ''
	formData.status = ''
	getLists()
}

// 获取列表数据
const getLists = async () => {
	loading.value = true
	lists.value = await apiDeptLists({
		...formData,
	})
	loading.value = false
}

// 删除 
const handleDelete = (id: number) => {
	apiDeptDelete({
		id
	}).then(() => {
		getLists()
	})
}

// 展开/折叠列表
const openOrFold = () => {
	// console.log('触发')
	if (openIdArr.value.length) {
		openIdArr.value = []
	} else {
		let allArr = flatten(lists.value, [], 'children')
		openIdArr.value = allArr.map(item => item.id + '')
	}
}

onMounted(async () => {
	await getLists()

	openOrFold()
})
</script>

<style lang="scss" scoped>
.ls-form {
	margin-bottom: -16px;
}
</style>
