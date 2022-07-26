<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="700px"
            :clickModalClose="true"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <div class="h-[400px]">
                <el-scrollbar>
                    <el-form ref="formRef" :model="formData" label-width="120px" :rules="formRules">
                        <el-form-item label="父级菜单" prop="pid">
                            <el-tree-select
                                class="w-80"
                                v-model="formData.pid"
                                :data="menuOptions"
                                clearable
                                node-key="id"
                                :props="{
                                    label: 'name'
                                }"
                                :default-expand-all="true"
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
                            <div class="w-80">
                                <el-input v-model="formData.name" placeholder="请输入菜单名称" />
                            </div>
                        </el-form-item>
                        <el-form-item
                            v-if="formData.type != EMenuType.BUTTON"
                            label="菜单图标"
                            prop="icon"
                        >
                            <div class="w-80">
                                <icon-picker v-model="formData.icon" />
                            </div>
                        </el-form-item>
                        <el-form-item label="菜单排序" prop="sort">
                            <el-input-number v-model="formData.sort" />
                        </el-form-item>
                        <el-form-item
                            v-if="formData.type != EMenuType.BUTTON"
                            label="路由路径"
                            prop="paths"
                        >
                            <div>
                                <div class="w-80">
                                    <el-input
                                        v-model="formData.paths"
                                        placeholder="请输入路由路径"
                                    />
                                </div>
                                <div class="form-tips">
                                    访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item
                            v-if="formData.type == EMenuType.MENU"
                            label="组件路径"
                            prop="component"
                        >
                            <div>
                                <div class="w-80">
                                    <el-input
                                        v-model="formData.component"
                                        placeholder="请输入组件路径"
                                    />
                                </div>
                                <div class="form-tips">
                                    访问的组件路径，如：`user/setting`，默认在`views`目录下
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item
                            v-if="formData.type != EMenuType.CATALOGUE"
                            label="权限字符"
                            prop="perms"
                        >
                            <div>
                                <div class="w-80">
                                    <el-input
                                        v-model="formData.perms"
                                        placeholder="请输入权限字符"
                                    />
                                </div>
                                <div class="form-tips">
                                    将作为server端API验权使用，如`auth.admin/user`，请谨慎修改
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item
                            v-if="formData.type == EMenuType.MENU"
                            label="路由参数"
                            prop="params"
                        >
                            <div>
                                <div class="w-80">
                                    <el-input
                                        v-model="formData.params"
                                        placeholder="请输入路由参数"
                                    />
                                </div>
                                <div class="form-tips">
                                    访问路由的默认传递参数，如：`{"id": 1, "name":
                                    "admin"}`或`id=1&name=admin`
                                </div>
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
                        <el-form-item
                            v-if="formData.type != EMenuType.BUTTON"
                            label="是否显示"
                            prop="is_show"
                            required
                        >
                            <div>
                                <el-radio-group v-model="formData.is_show">
                                    <el-radio :label="1">显示</el-radio>
                                    <el-radio :label="0">隐藏</el-radio>
                                </el-radio-group>
                                <div class="form-tips">
                                    选择隐藏则路由将不会出现在侧边栏，但仍然可以访问
                                </div>
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
                                <div class="form-tips">
                                    选择停用则路由将不会出现在侧边栏，也不能被访问
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-scrollbar>
            </div>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { menuLists, menuEdit, menuAdd } from '@/api/perms/menu'
import { EMenuType } from '@/config/enums'
import Popup from '@/components/popup/index.vue'

const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑菜单' : '新增菜单'
})

const formData = reactive({
    id: '',
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
    ]
}
const menuOptions = ref<any[]>([])

const getMenu = async () => {
    const data: any = await menuLists({ page_type: 0 })
    const menu = { id: 0, name: '顶级', children: [] }
    menu.children = data.lists
    menuOptions.value.push(menu)
}

const handleSubmit = async () => {
    await formRef.value?.validate()
    mode.value == 'edit' ? await menuEdit(formData) : await menuAdd(formData)
    popupRef.value?.close()
    emit('success')
}

const open = (type = 'add') => {
    mode.value = type
    popupRef.value?.open()
}

const setFormData = (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
}

const handleClose = () => {
    emit('close')
}

getMenu()

defineExpose({
    open,
    setFormData
})
</script>
