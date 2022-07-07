<!-- 存储设置 -->
<template>
	<div class="storage">
		<el-card shadow="never">
			<el-alert
				class="xxl"
				title="温馨提示：1.切换存储方式后，需要将资源文件传输至新的存储端；2.请勿随意切换存储方式，可能导致图片无法查看"
				:closable="false"
				show-icon
			></el-alert>
		</el-card>

		<el-card class="m-t-15" shadow="never">
			<div>
				<el-table class="m-t-20" :data="storageLists">
					<el-table-column label="储存方式" prop="name"></el-table-column>
					<el-table-column label="储存位置" prop="path"></el-table-column>
					<el-table-column label="状态" width="100">
						<template #default="{ row }">
							<el-tag v-if="row.status == 1">开启</el-tag>
							<el-tag type="info" v-else>关闭</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right" width="100">
						<template #default="{ row }" v-perms="['setting.storage/setup']">
							<router-link
								class="m-r-10"
								:to="{
									path: '/setting/storage/edit',
									query: {
										engine: row.engine
									}
								}"
							>
								<el-button type="text">设置</el-button>
							</router-link>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import {
	apiStorageLists,
	apiStorageChange,
} from '@/api/setting'
import {
	ref,
	onMounted,
} from 'vue'

// 列表数据
let storageLists = ref<Array<object>>([])

// 获取存储引擎列表数据
const getStorageLists = async () => {
	storageLists.value = await apiStorageLists()
	console.log('storageLists.value', storageLists.value)
}

// 切换存储引擎
const handleChange = async (event) => {
	await apiStorageChange({
		engine: event.engine,
	})

	getStorageLists()
}

onMounted(() => {
	getStorageLists()
})

</script>

<style lang="scss" scoped></style>
