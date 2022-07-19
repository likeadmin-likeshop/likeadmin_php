<template>
  <div class="code-generation">
    <el-card class="!border-none" shadow="never">
      <el-form class="ls-form" :model="formData" label-width="80px" inline>
        <el-form-item label="表名称">
          <el-input v-model="formData.table_name" class="ls-input" />
        </el-form-item>
        <el-form-item label="表描述">
          <el-input v-model="formData.table_comment" class="ls-input" />
        </el-form-item>
        <el-form-item>
          <div class="m-l-20">
            <el-button type="primary" @click="resetPage">查询</el-button>
            <el-button @click="resetParams">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt-4 !border-none" v-loading="pager.loading" shadow="never">
      <data-table
        v-perms="['tools.generator/selectTable']"
        class="inline-block mr-[10px]"
        @success="requestApi"
      >
        <el-button type="primary">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          导入数据表
        </el-button>
      </data-table>
      <el-button
        v-perms="['tools.generator/delete']"
        :disabled="!selectData.length"
        @click="handleDelete(selectData)"
        type="danger"
      >
        <template #icon>
          <icon name="el-icon-Delete" />
        </template>
        删除
      </el-button>
      <el-button
        v-perms="['tools.generator/generate']"
        :disabled="!selectData.length"
        @click="handleGenerate(selectData)"
      >
        生成代码
      </el-button>

      <div class="mt-4">
        <el-table :data="pager.lists" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="表名称" prop="table_name" />
          <el-table-column label="表描述" prop="table_comment" />
          <el-table-column label="创建时间" prop="create_time" />
          <el-table-column label="更新时间" prop="update_time" />
          <el-table-column label="操作" width="280" fixed="right">
            <template #default="{ row }">
              <el-button
                v-perms="['tools.generator/preview']"
                type="primary"
                link
                @click="handlePreview(row.id)"
              >
                预览
              </el-button>
              <el-button
                v-perms="['tools.generator/generate']"
                type="primary"
                link
                @click="handleGenerate(row.id)"
              >
                代码生成
              </el-button>
              <el-button v-perms="['tools.generator/edit']" type="primary" link>
                <router-link
                  :to="{
                    path: '/dev_tools/code/edit',
                    query: {
                      id: row.id
                    }
                  }"
                >
                  编辑
                </router-link>
              </el-button>
              <el-button
                v-perms="['tools.generator/syncColumn']"
                type="primary"
                link
                @click="handleSync(row.id)"
              >
                同步
              </el-button>
              <el-button type="danger" link @click="handleDelete(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="requestApi" />
      </div>
    </el-card>
    <code-preview v-if="codePreview.show" v-model="codePreview.show" :code="codePreview.code" />
  </div>
</template>

<script lang="ts" setup>
import {
  getGenerateTable,
  syncColumn,
  generateDelete,
  generatePreview,
  generateCode
} from '@/api/dev_tools'
import { usePaging } from '@/hooks/paging'
import DataTable from '../components/data-table.vue'
import CodePreview from '../components/code-preview.vue'
import modal from '@/utils/modal'

const formData = reactive({
  table_name: '',
  table_comment: ''
})

const codePreview = reactive({
  show: false,
  code: []
})

const { pager, requestApi, resetParams, resetPage } = usePaging({
  fetchFun: getGenerateTable,
  params: formData
})

const selectData = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
  selectData.value = val.map(({ id }) => id)
}

const handleSync = async (id: number) => {
  await modal.confirm('确认要同步表结构？')
  await syncColumn({ id })
}

const handleDelete = async (id: number | any[]) => {
  await modal.confirm('确认要删除？')
  await generateDelete({ id })
  requestApi()
}

const handlePreview = async (id: number) => {
  // const loadingInstance = ElLoading.service({
  //     text: '正在生成中...',
  //     fullscreen: true
  // })
  try {
    const data: any = await generatePreview({ id })
    codePreview.code = data
    codePreview.show = true
    // loadingInstance.close()
    // setTimeout(() => {
    //
    // }, 50)
  } catch (error) {
    // loadingInstance.close()
  }
}

const handleGenerate = async (id: number | number[]) => {
  const data: any = await generateCode({ id })
  if (data.file) {
    window.open(data.file, '_blank')
  }
}

requestApi()
</script>

<style lang="scss" scoped>
.ls-form {
  margin-bottom: -16px;
}
</style>
