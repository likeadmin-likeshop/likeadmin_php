<template>
  <div class="menu-lists">
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="菜单名称">
          <el-input v-model="queryParams.name" />
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-select v-model="queryParams.is_disable">
            <el-option label="全部" value />
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
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
        <el-button v-perms="['auth.menu/add']" type="primary" @click="handleAdd()">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增
        </el-button>
        <el-button @click="handleExpand">
          <template #icon>
            <icon name="el-icon-Sort" />
          </template>
          展开/折叠
        </el-button>
      </div>
      <el-table
        ref="tableRef"
        class="mt-4"
        size="large"
        v-loading="pager.loading"
        :data="pager.lists"
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
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['auth.menu/add']" type="primary" link @click="handleAdd(row.id)">
              新增
            </el-button>
            <el-button v-perms="['auth.menu/edit']" type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button
              v-perms="['auth.menu/delete']"
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
import { menuDelete, menuLists } from '@/api/perms/menu'
import type { ElTable } from 'element-plus'
import { usePaging } from '@/hooks/paging'
import { EMenuType } from '@/config/enums'
import EditPopup from './edit.vue'
const tableRef = shallowRef<InstanceType<typeof ElTable>>()
const editRef = shallowRef<InstanceType<typeof EditPopup>>()
let isExpand = false
const queryParams = reactive({
  page_type: 0,
  name: '',
  is_disable: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: menuLists,
  params: queryParams
})

const handleAdd = (id?: number) => {
  if (id) {
    editRef.value?.setFormData({
      pid: id
    })
  }
  editRef.value?.open('add')
}

const handleEdit = (data: any) => {
  editRef.value?.open('edit')
  editRef.value?.setFormData(data)
}

const handleDelete = async (id: number) => {
  await menuDelete({ id })
  getLists()
}

const handleExpand = () => {
  isExpand = !isExpand
  toggleExpand(pager.lists, isExpand)
}

const toggleExpand = (children: any[], unfold = true) => {
  for (const key in children) {
    tableRef.value?.toggleRowExpansion(children[key], unfold)
    if (children[key].children) {
      toggleExpand(children[key].children!, unfold)
    }
  }
}

getLists()
</script>
