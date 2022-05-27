<!-- 岗位列表 -->
<template>
	<div class="post">
		<el-card shadow="never">
			<el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
				<el-form-item label="岗位编码">
					<el-input v-model="formData.code" class="ls-input" />
				</el-form-item>
				<el-form-item label="岗位名称">
					<el-input v-model="formData.name" class="ls-input" />
				</el-form-item>
				<el-form-item label="岗位状态：">
					<el-select v-model="formData.status" placeholder="全部">
						<el-option v-for="item in statusList" :key="item.val" :label="item.name" :value="item.val">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<div class="m-l-20">
						<el-button type="primary" @click="resetPage">查询</el-button>
						<el-button @click="resetParams">重置</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card v-loading="pager.loading" class="m-t-15" shadow="never">
			<router-link to="/organization/post/edit">
				<el-button type="primary" size="small">新增岗位</el-button>
			</router-link>
			<div class="m-t-15">
				<el-table :data="pager.lists" size="small" row-key="id">
					<el-table-column label="岗位编码" prop="code" min-width="100"></el-table-column>
					<el-table-column label="岗位名称" prop="name" min-width="100"></el-table-column>
					<el-table-column label="岗位状态" prop="status_desc" min-width="100">
						<template #default="{ row }">
							<el-tag class="ml-2" :type="row.status ? '' : 'danger'">{{ row.status_desc }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="排序" prop="sort" min-width="100"></el-table-column>
					<el-table-column label="添加时间" prop="create_time" min-width="100"></el-table-column>
					<el-table-column label="操作" min-width="100" fixed="right">
						<template #default="{ row }">
							<router-link class="m-r-10" :to="{
                                    path: '/organization/post/edit',
                                    query: {
                                        id: row.id
                                    }
                                }">
								<el-button type="text">编辑</el-button>
							</router-link>
							<popup class="m-r-10 inline" @confirm="handleDelete(row.id)">
								<template #trigger>
									<el-button type="text">删除</el-button>
								</template>
							</popup>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="flex row-right">
				<pagination v-model="pager" layout="total, prev, pager, next, jumper" @change="requestApi" />
			</div>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
	import {
		defineComponent,
		onMounted,
		reactive,
		Ref,
		ref
	} from 'vue'
	import Pagination from '@/components/pagination/index.vue'
	import Popup from '@/components/popup/index.vue'
	import {
		apiJobsLists,
		apiJobsDelete
	} from '@/api/organization'
	import {
		usePages
	} from '@/core/hooks/pages'

	// 表单数据
	const formData = reactive({
		code: '', 	// 编码
		name: '', 	// 岗位名称
		status: '', // 状态 0-停用 1-正常
	})

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

	// 分页请求
	const {
		pager,
		requestApi,
		resetParams,
		resetPage
	} = usePages({
		callback: apiJobsLists,
		params: formData
	})

	// 删除 
	const handleDelete = (id: number) => {
		apiJobsDelete({
			id
		}).then(() => {
			requestApi()
		})
	}

	onMounted(() => {
		requestApi()
	})
</script>

<style lang="scss" scoped>
	.ls-form {
		margin-bottom: -16px;
	}
</style>
