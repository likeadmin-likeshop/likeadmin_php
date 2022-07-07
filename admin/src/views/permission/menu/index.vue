<template>
  <div class="menu-lists">
    <el-card shadow="never">
      <el-form ref="formRef" style="margin-bottom: -16px" :model="queryParams" :inline="true">
        <el-form-item label="菜单名称">
          <el-input v-model="queryParams.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-select v-model="queryParams.is_disable" placeholder="请选择菜单状态">
            <el-option label="全部" value />
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">清空查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="m-t-16" shadow="never">
      <div>
        <router-link v-perms="['auth.menu/add']" class="m-r-10" to="/permission/menu/edit">
          <el-button type="primary">新增</el-button>
        </router-link>
        <el-button @click="handleExpand">全部展开/折叠</el-button>
      </div>
      <el-table
        ref="tableRef"
        v-loading="pager.loading"
        :data="pager.lists"
        class="m-t-16"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="菜单名称" prop="name" min-width="150" />
        <el-table-column label="类型" prop="type" min-width="80">
          <template #default="{ row }">
            <div v-if="row.type == EMenuType.CATALOGUE">目录</div>
            <div v-else-if="row.type == EMenuType.MENU">菜单</div>
            <div v-else-if="row.type == EMenuType.BUTTON">按钮</div>
          </template>
        </el-table-column>
        <el-table-column label="图标" prop="icon" min-width="80">
          <template #default="{ row }">
            <div class="flex">
              <icon :name="row.icon" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="权限标识" prop="perms" min-width="150"></el-table-column>
        <el-table-column label="状态" prop="is_disable" min-width="100">
          <template #default="{ row }">
            <el-tag v-if="row.is_disable == 0">正常</el-tag>
            <el-tag v-else type="danger">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" min-width="100"></el-table-column>
        <el-table-column label="更新时间" prop="update_time" min-width="180"></el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <router-link
              v-perms="['auth.menu/edit']"
              class="m-r-10"
              :to="{
                path: '/permission/menu/edit',
                query: {
                  id: row.id
                }
              }"
            >
              <el-button type="primary" link>编辑</el-button>
            </router-link>
            <el-button
              v-perms="['auth.menu/delete']"
              type="primary"
              link
              @click="handleDelete(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, shallowRef } from 'vue'
import { apiFileList } from '@/api/app'
import { apiMenuDelete, apiMenuLists } from '@/api/auth'
import { ElTable } from 'element-plus'
import { useRoute } from 'vue-router'
import { usePages } from '@/core/hooks/pages'
import { EMenuType } from '@/utils/enum'
const { query } = useRoute()
const tableRef = shallowRef<InstanceType<typeof ElTable>>()
const isExternal = ref(false)
const queryParams = reactive({
  page_type: 0,
  name: '',
  is_disable: ''
})

const { pager, requestApi, resetPage, resetParams } = usePages({
  callback: apiMenuLists,
  params: queryParams
})

const handleDelete = async (id: number) => {
  await apiMenuDelete({ id })
  requestApi()
}

const handleExpand = () => {
  isExternal.value = !isExternal.value
  toggleExpand(pager.lists, isExternal.value)
}

const toggleExpand = (children: any[], unfold = true) => {
  for (const key in children) {
    tableRef.value?.toggleRowExpansion(children[key], unfold)
    if (children[key].children) {
      toggleExpand(children[key].children!, unfold)
    }
  }
}

requestApi()
</script>
