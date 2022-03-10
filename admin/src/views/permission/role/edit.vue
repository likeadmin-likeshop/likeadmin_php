<template>
    <div class="role-edit">
        <el-card shadow="never">
            <el-page-header :content="id ? '编辑角色' : '新增角色'" @back="$router.back()" />
        </el-card>

        <el-card shadow="never" class="m-t-15">
            <el-form
                ref="formRef"
                :rules="rules"
                class="ls-form"
                :model="formData"
                label-width="150px"
                size="small"
            >
                <!-- 名称 -->
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <!-- 备注 -->
                <el-form-item label="备注" prop="desc">
                    <el-input
                        v-model="formData.desc"
                        placeholder="请输入备注"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6 }"
                    ></el-input>
                </el-form-item>
                <!-- 权限 -->
                <el-form-item label="权限" prop="auth_keys">
                    <div class="flex" style="margin-top: 3px">
                        <el-button type="text" size="mini" @click="allSelect()"> 全选 </el-button>
                        <el-button type="text" size="mini" @click="close()"> 全不选 </el-button>
                    </div>

                    <el-tree
                        ref="treeRef"
                        :data="menu.permissionsTree"
                        node-key="auth_key"
                        default-expand-all
                        icon="ArrowRight"
                        :props="{
                            children: 'sons',
                            label: 'name'
                        }"
                        empty-text=""
                        show-checkbox
                        @check-change="handlePermissionsCheckChange"
                    />
                </el-form-item>
            </el-form>
        </el-card>

        <footer-btns>
            <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, Ref, ref, toRefs } from 'vue'
import {
    apiConfigGetMenu,
    apiConfigGetAuth,
    apiRoleAdd,
    apiRoleEdit,
    apiRoleDetail
} from '@/api/auth'
import { ElInput, ElForm } from 'element-plus'
import FooterBtns from '@/components/footer-btns/index.vue'
import { useAdmin } from '@/core/hooks/app'
import { flatten } from '@/utils/util'
export default defineComponent({
    components: {
        FooterBtns
    },
    setup() {
        const { route, router } = useAdmin()
        const formRef: Ref<typeof ElForm | null> = ref(null)
        const treeRef: Ref<typeof ElForm | null> = ref(null)
        const id: Ref<Number | null> = ref(null) // 当前编辑角色ID

        // 表单数据
        const { formData, menu } = toRefs(
            reactive({
                formData: {
                    name: '', // 角色名称
                    desc: '', // 备注
                    auth_keys: [] // 权限
                },

                menu: {
                    permissionsTree: [], // 菜单
                    allAuthKeys: [] // 菜单全部的auth_keys
                }
            })
        )

        // 表单验证
        const rules = {
            name: [
                {
                    required: true,
                    message: '请输入角色名称',
                    trigger: ['blur']
                }
            ]
        }

        // 确定提交
        const onSubmit = () => {
            formRef.value?.validate((valid: boolean) => {
                if (!valid) {
                    return
                }

                id.value ? roleEdit() : roleAdd()
            })
        }

        const getMenu = () => {
            apiConfigGetMenu()
                .then((res: any) => {
                    // 获取菜单
                    menu.value.permissionsTree = res
                    // console.log('res', res)

                    // 数组扁平化
                    const menuFlatten = flatten(res, [], 'sons')
                    // console.log(menuFlatten)
                    // 获取菜单全部 auth_key
                    menu.value.allAuthKeys = menuFlatten.map((item: any) => item.auth_key) as never
                })
                .catch((err: any) => {
                    console.log('err', err)
                })
        }

        // 添加角色
        const roleAdd = () => {
            apiRoleAdd({ ...formData.value })
                .then((res: any) => {
                    console.log('res', res)
                    setTimeout(() => {
                        router.back()
                    }, 500)
                })
                .catch((err: any) => {
                    console.log('err', err)
                })
        }
        // 编辑角色
        const roleEdit = () => {
            apiRoleEdit({
                ...formData.value,
                id: id.value
            })
                .then((res: any) => {
                    console.log('res', res)
                    setTimeout(() => {
                        router.back()
                    }, 500)
                })
                .catch((err: any) => {
                    console.log('err', err)
                })
        }

        // 角色详情
        const roleDetail = () => {
            apiRoleDetail({
                id: id.value
            })
                .then((res: any) => {
                    console.log('res', res)

                    formData.value = res
                    // formData.value.auth_keys = []

                    treeRef.value?.setCheckedKeys(res.auth_keys)
                })
                .catch((err: any) => {
                    console.log('err', err)
                })
        }

        // 权限树触发函数
        const handlePermissionsCheckChange = (data: any, checked: boolean) => {
            console.log(data)
            if (!data.auth_key) {
                return
            }
            const index = formData.value.auth_keys.findIndex(item => item == data.auth_key)
            if (checked) {
                index == -1 && (formData.value.auth_keys as any).push(data.auth_key)
                return
            }

            if (index != -1) {
                formData.value.auth_keys.splice(index, 1)
            }
        }

        // 全选
        const allSelect = () => {
            treeRef.value?.setCheckedKeys(menu.value.allAuthKeys)
        }

        // 全不选
        const close = () => {
            treeRef.value?.setCheckedKeys([])
        }

        onMounted(() => {
            const query: any = route.query
            if (query.id) {
                id.value = query.id * 1
                roleDetail()
            }

            getMenu()
        })

        return {
            id,
            formData,
            menu,
            formRef,
            treeRef,
            rules,
            getMenu,
            roleAdd,
            roleEdit,
            roleDetail,
            onSubmit,
            handlePermissionsCheckChange,
            close,
            allSelect
        }
    }
})
</script>

<style lang="scss" scoped>
.role-edit {
    :deep .el-textarea {
        width: 340px;
    }
}
</style>
