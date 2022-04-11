<!-- 系统日志 -->
<template>
    <div class="journal">
        <el-card shadow="never">
            <el-form class="ls-form" :model="formData" label-width="80px" size="small" inline>
                <el-form-item label="管理员">
                    <el-input
                        placeholder="请输入"
                        class="ls-input"
                        v-model="formData.admin_name"
                    />
                </el-form-item>

                <el-form-item label="访问方式">
                    <el-select v-model="formData.type" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in visitType"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
				
				<el-form-item label="来源IP">
				    <el-input
				        placeholder="请输入"
				        class="ls-input"
				        v-model="formData.ip"
				    />
				</el-form-item>
				
				<el-form-item label="访问时间">
				    <data-picker
				        v-model:start_time="formData.start_time"
				        v-model:end_time="formData.end_time"
				    ></data-picker>
				</el-form-item>
				
				<el-form-item label="访问链接">
				    <el-input
				        placeholder="请输入"
				        class="ls-input"
				        v-model="formData.url"
				    />
				</el-form-item>

                <el-form-item>
                    <div class="m-l-20">
                        <el-button type="primary" @click="resetPage">查询</el-button>
                        <el-button @click="resetParams">重置</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="m-t-15" shadow="never" v-loading="pager.loading">
            <div>
                <el-table class="m-t-20" :data="pager.lists">
                    <el-table-column label="记录ID" prop="id"></el-table-column>
                    <el-table-column label="操作" prop="action"></el-table-column>
                    <el-table-column label="管理员" prop="admin_name"></el-table-column>
                    <el-table-column label="管理员ID" prop="admin_id"> </el-table-column>
                    <el-table-column label="访问链接" prop="url"></el-table-column>
                    <el-table-column label="访问方式" prop="type"></el-table-column>
                    <el-table-column label="访问参数" prop="params"> </el-table-column>
					<el-table-column label="来源IP" prop="ip"> </el-table-column>
					<el-table-column label="日志时间" prop="create_time"> </el-table-column>
                </el-table>
            </div>
            <div class="flex row-right">
                <pagination
                    v-model="pager"
                    @change="requestApi"
                    layout="total, prev, pager, next, jumper"
                />
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import {
        apiSystemLogLists
    } from '@/api/setting'
    import { onMounted, reactive, ref } from 'vue'
    import Pagination from '@/components/pagination/index.vue'
    import Popup from '@/components/Popup/index.vue'
    import { usePages } from '@/core/hooks/pages'
	import DataPicker from '@/components/data-picker/index.vue'

    interface formDataObj {
        admin_name?: string // 管理员
		url?: string // 访问链接
		ip?: string // ip
		type?: string // 访问方式
		start_time?: string // 日志时间开始
		end_time?: string // 日志时间结束
    }
	
	// 查询表单
    let formData = ref<formDataObj>({
        admin_name: '',
        url: '',
		ip: '',
		type: '',
		start_time: '',
		end_time: '',
    })
	
	// 访问方式
	const visitType = ref<Array<any>>([
		{
			label: '全部',
			value: '',
		},
		{
			label: 'get',
			value: 'get',
		},
		{
			label: 'post',
			value: 'post',
		},
		{
			label: 'put',
			value: 'put',
		},
		{
			label: 'delete',
			value: 'delete',
		},
		{
			label: 'option',
			value: 'option',
		},
	])

    const { pager, requestApi, resetParams, resetPage } = usePages({
        callback: apiSystemLogLists,
        params: formData.value,
    })

    onMounted(() => {
        requestApi()
    })
</script>

<style lang="scss" scoped></style>
