<template>
  <div class="menu-edit">
    <el-card shadow="never">
      <el-page-header :content="getPageTitle" @back="$router.back()" />
    </el-card>
    <el-card v-loading="loading" class="m-t-16" shadow="never">
      <el-form
        class="ls-form"
        ref="formRef"
        :model="formData"
        label-width="120px"
        :rules="formRules"
      >
        <el-form-item label="父级菜单" prop="pid">
          <el-tree-select
            v-model="formData.pid"
            :data="menuLists"
            clearable
            node-key="id"
            :props="{
              label: 'name'
            }"
            placeholder="请选择父级菜单"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="菜单类型" prop="type" required>
          <el-radio-group v-model="formData.type">
            <el-radio :label="EMenuType.CATALOGUE">目录</el-radio>
            <el-radio :label="EMenuType.MENU">菜单</el-radio>
            <el-radio :label="EMenuType.BUTTON">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item v-if="formData.type != EMenuType.BUTTON" label="菜单图标" prop="icon">
          <icon-select v-model="formData.icon" style="width: 280px;" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="sort">
          <el-input-number v-model="formData.sort" />
        </el-form-item>
        <el-form-item v-if="formData.type != EMenuType.BUTTON" label="路由路径" prop="paths">
          <div>
            <el-input v-model="formData.paths" style="width: 280px;" placeholder="请输入路由路径"></el-input>
            <div class="form-tips">访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头</div>
          </div>
        </el-form-item>
        <el-form-item v-if="formData.type == EMenuType.MENU" label="组件路径" prop="component">
          <div>
            <el-input v-model="formData.component" style="width: 280px;" placeholder="请输入组件路径"></el-input>
            <div class="form-tips">访问的组件路径，如：`user/setting`，默认在`views`目录下</div>
          </div>
        </el-form-item>
        <el-form-item v-if="formData.type != EMenuType.CATALOGUE" label="权限字符" prop="perms">
          <div>
            <el-input v-model="formData.perms" style="width: 280px;" placeholder="请输入权限字符"></el-input>
            <div class="form-tips">将作为server端API验权使用，如`auth.admin/user`，请谨慎修改</div>
          </div>
        </el-form-item>
        <el-form-item v-if="formData.type == EMenuType.MENU" label="路由参数" prop="params">
          <div>
            <el-input v-model="formData.params" style="width: 280px;" placeholder="请输入路由参数"></el-input>
            <div class="form-tips">访问路由的默认传递参数，如：`{"id": 1, "name": "admin"}`或`id=1&name=admin`</div>
          </div>
        </el-form-item>
        <!-- <el-form-item v-if="formData.type == EMenuType.MENU" label="是否缓存" prop="is_cache" required>
          <div>
            <el-radio-group v-model="formData.is_cache">
              <el-radio :label="1">缓存</el-radio>
              <el-radio :label="0">不缓存</el-radio>
            </el-radio-group>
            <div class="form-tips">选择缓存则会被`keep-alive`缓存</div>
          </div>
        </el-form-item>-->
        <el-form-item v-if="formData.type != EMenuType.BUTTON" label="是否显示" prop="is_show" required>
          <div>
            <el-radio-group v-model="formData.is_show">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
            </el-radio-group>
            <div class="form-tips">选择隐藏则路由将不会出现在侧边栏，但仍然可以访问</div>
          </div>
        </el-form-item>
        <el-form-item
          v-if="formData.type != EMenuType.BUTTON"
          label="菜单状态"
          prop="is_disable"
          required
        >
          <div>
            <el-radio-group v-model="formData.is_disable">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
            <div class="form-tips">选择停用则路由将不会出现在侧边栏，也不能被访问</div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <footer-btns>
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </footer-btns>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconSelect from '@/components/icon/select.vue'
import type { FormInstance } from 'element-plus'
import { apiMenuAdd, apiMenuDetail, apiMenuEdit, apiMenuLists } from '@/api/auth'
import { EMenuType } from '@/utils/enum'

const { query } = useRoute()
const router = useRouter()
const loading = ref(false)
const formRef = shallowRef<FormInstance>()
const getPageTitle = computed(() => {
  return query.id ? '编辑菜单' : '新增菜单'
})
const formData = reactive({
  //父级id
  pid: 0,
  //类型
  type: EMenuType.CATALOGUE,
  //图标
  icon: '',
  //名称
  name: '',
  //排序号
  sort: 1,
  // 路由路径
  paths: '',
  //权限链接
  perms: '',
  //前端组件
  component: '',
  //选中路径
  selected: '',
  //路由参数
  params: '',
  //是否缓存 0=否， 1=是
  is_cache: 0,
  //是否显示 0=否， 1=是
  is_show: 1,
  //是否禁用 0=否， 1=是
  is_disable: 0
})

const formRules = {
  pid: [
    {
      required: true,
      message: '请选择父级菜单',
      trigger: ['blur', 'change']
    }
  ],
  name: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'blur'
    }
  ],
  paths: [
    {
      required: true,
      message: '请输入路由地址',
      trigger: 'blur'
    }
  ],
  component: [
    {
      required: true,
      message: '请输入组件地址',
      trigger: 'blur'
    }
  ],
  perms: [
    {
      required: true,
      message: '请输入权限字符',
      trigger: 'blur'
    }
  ]
}
const menuLists = ref<any[]>([])

const getMenuLists = async () => {
  const data: any = await apiMenuLists({ page_type: 1 })
  const menu = { id: 0, name: '顶级', children: [] }
  menu.children = data.lists
  menuLists.value.push(menu)
}

const getDetail = async () => {
  const id = query.id
  if (!id) {
    return
  }
  loading.value = true
  try {
    const data = await apiMenuDetail({ id })
    Object.keys(formData).forEach((key) => {
      //@ts-ignore
      formData[key] = data[key]
    })
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}

const handleSubmit = async () => {
  const id = query.id
  await formRef.value?.validate()
  id ? await apiMenuEdit({ id, ...formData }) : await apiMenuAdd(formData)
  router.back()
}

getMenuLists()
getDetail()
</script>
