<template>
  <div class="menu-lists">
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="岗位编码">
          <el-input v-model="queryParams.code" />
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input v-model="queryParams.name" />
        </el-form-item>
        <el-form-item label="岗位状态">
          <el-select v-model="queryParams.status">
            <el-option label="全部" value />
            <el-option label="正常" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button v-perms="['dept.jobs/add']" type="primary" @click="handleAdd()">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增
        </el-button>
      </div>
      <el-table class="mt-4" size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="岗位编码" prop="code" min-width="100" />
        <el-table-column label="岗位名称" prop="name" min-width="100" />
        <el-table-column label="排序" prop="sort" min-width="100" />
        <el-table-column label="添加时间" prop="create_time" min-width="100" />
        <el-table-column label="状态" prop="status" min-width="100">
          <template #default="{ row }">
            <el-tag class="ml-2" :type="row.status ? '' : 'danger'">{{ row.status_desc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['dept.jobs/edit']" type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button
              v-perms="['dept.jobs/delete']"
              type="danger"
              link
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <edit-popup ref="editRef" @success="getLists" />
  </div>
</template>
<script lang="ts" setup>
import { jobsDelete, jobsLists } from '@/api/org/post'
import { usePaging } from '@/hooks/paging'
import EditPopup from './edit.vue'
const editRef = shallowRef<InstanceType<typeof EditPopup>>()
const queryParams = reactive({
  code: '',
  name: '',
  status: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: jobsLists,
  params: queryParams
})

const handleAdd = () => {
  editRef.value?.open('add')
}

const handleEdit = (data: any) => {
  editRef.value?.open('edit')
  editRef.value?.setFormData(data)
}

const handleDelete = async (id: number) => {
  await jobsDelete({ id })
  getLists()
}

getLists()
</script>
