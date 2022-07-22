<template>
  <div class="admin">
    <el-card class="!border-none" shadow="never">
      <el-form class="mb-[-16px]" :model="formData" label-width="80px" inline>
        <el-form-item label="账号">
          <el-input v-model="formData.account" class="ls-input" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formData.name" class="ls-input" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formData.role_id">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="pager.loading" class="mt-4 !border-none" shadow="never">
      <el-button v-perms="['auth.admin/add']" type="primary" @click="handleAdd">
        <template #icon>
          <icon name="el-icon-Plus" />
        </template>
        新增管理员
      </el-button>
      <div class="mt-4">
        <el-table :data="pager.lists" size="large">
          <el-table-column label="ID" prop="id" min-width="60"></el-table-column>
          <el-table-column label="头像" min-width="100">
            <template #default="{ row }">
              <!-- <el-avatar :size="50" :src="row.avatar"></el-avatar> -->
              <el-image :src="row.avatar" preview-teleported :preview-src-list="[row.avatar]" />
            </template>
          </el-table-column>
          <el-table-column label="账号" prop="account" min-width="100"></el-table-column>
          <el-table-column label="名称" prop="name" min-width="100"></el-table-column>
          <el-table-column label="角色" prop="role_name" min-width="100"></el-table-column>
          <el-table-column label="部门" prop="dept_name" min-width="100"></el-table-column>
          <el-table-column label="创建时间" prop="create_time" min-width="150"></el-table-column>
          <el-table-column label="最近登录时间" prop="login_time" min-width="150"></el-table-column>
          <el-table-column label="最近登录IP" prop="login_ip" min-width="120"></el-table-column>
          <el-table-column label="状态" min-width="100" v-perms="['auth.admin/edit']">
            <template #default="{ row }">
              <el-switch
                v-model="row.disable"
                :active-value="0"
                :inactive-value="1"
                @change="changeStatus(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button v-perms="['auth.admin/edit']" type="primary" link @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button
                v-perms="['auth.admin/delete']"
                type="danger"
                link
                @click="handleDelete(row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex mt-4 justify-end">
        <pagination v-model="pager" layout="total, prev, pager, next, jumper" @change="getLists" />
      </div>
    </el-card>
    <edit-popup ref="editRef" @success="getLists" />
  </div>
</template>

<script lang="ts" setup>
import { adminEdit, adminLists, adminDelete } from '@/api/perms/admin'
import { roleLists } from '@/api/perms/role'
import { usePaging } from '@/hooks/paging'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'
const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 表单数据
const formData = reactive({
  account: '',
  name: '',
  role_id: ''
})
const roleList = ref<any[]>([])
const { pager, getLists, resetParams, resetPage } = usePaging({
  fetchFun: adminLists,
  params: formData
})

const changeStatus = (data: any) => {
  adminEdit({
    id: data.id,
    account: data.account,
    name: data.name,
    role_id: data.role_id,
    disable: data.disable,
    multipoint_login: data.multipoint_login
  }).finally(() => {
    getLists()
  })
}
const handleAdd = () => {
  editRef.value?.open('add')
}

const handleEdit = (data: any) => {
  editRef.value?.open('edit')
  editRef.value?.setFormData(data)
}

const handleDelete = async (id: number) => {
  await feedback.confirm('确认要删除？')
  await adminDelete({ id })
  getLists()
}

const getRoleList = () => {
  roleLists({
    page_type: 0
  }).then((res: any) => {
    roleList.value = res.lists
  })
}
onMounted(() => {
  getLists()
  getRoleList()
})
</script>
