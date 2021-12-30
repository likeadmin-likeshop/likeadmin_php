<template>
    <div class="role-edit">
        <el-card shadow="never">
            <el-page-header :content="mode == 'add' ? '新增角色':'编辑角色'" @back="$router.back()" />
        </el-card>

        <el-card shadow="never" class="m-t-15">
            <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
            <el-form :rules="rules" ref="formRef" class="ls-form" :model="formData" label-width="150px" size="small">
                <!-- 名称 -->
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <!-- 备注 -->
                <el-form-item label="备注" prop="desc">
                    <el-input v-model="formData.desc" placeholder="请输入备注" type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
                </el-form-item>
                <!-- 权限 -->
                <el-form-item label="备注" prop="desc">
                    <div class="flex" style="margin-top: 3px;">
                        <el-button type="text" size="mini">
                            全选
                        </el-button>
                        <el-button type="text" size="mini">
                            全不选
                        </el-button>
                    </div>

                     <el-tree
                       ref="permissionsTree"
                       :data="formData.permissionsTree"
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


    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
        onMounted,
        Ref,
        ref
    } from "vue";
    import {
        apiConfigGetMenu,
        apiConfigGetAuth,
        apiRoleAdd,
        apiRoleEdit,
        apiRoleDetail,
    } from '@/api/auth'
    import { PageMode } from '@/utils/type.ts'
    import { useRoute, useRouter } from 'vue-router'
    import { ElInput, ElForm } from 'element-plus'
    export default defineComponent({
        setup() {
            const router = useRouter()
            const route = useRoute()
            const formRef: Ref<typeof ElForm | null> = ref(null)

            const mode: Ref<String> = ref(PageMode['ADD']) // 当前页面【add: 添加角色 | edit: 编辑角色】
            const identity: Ref<Number | null> = ref(null)  // 当前编辑用户的身份ID  valid: mode = 'edit'

            // 表单数据
            const formData = reactive({
                name: '', // 角色名称
                desc: '', // 备注
                auth_keys: [], // 权限

                permissionsTree: [], // 菜单
            })

            // 表单验证
            const rules = {
                name: [
                    {
                        required: true,
                        message: '请输入角色名称',
                        trigger: ['blur'],
                    },
                ],
            }

             // 确定提交
            const onSubmit = () => {
                formRef.value?.validate((valid: boolean) => {
                    if (!valid) return

                    mode.value == 'add' ? roleAdd() : roleEdit
                })
            }


            const getMenu = () => {
                apiConfigGetMenu()
                    .then((res: any) => {
                        formData.permissionsTree = res
                        console.log('res', res)
                    })
                    .catch((err: any) => {
                        console.log('err', err)
                    })
            }

            // 添加角色
            const roleAdd = () => {
                apiRoleAdd({
                    name: formData.name,
                    desc: formData.desc,
                    auth_keys: formData.auth_keys,
                })
                    .then((res: any) => {
                        console.log('res', res)
                    })
                    .catch((err: any) => {
                        console.log('err', err)
                    })
            }
            // 编辑角色
            const roleEdit = () => {
                apiRoleEdit({
                    id: identity.value,
                    name: formData.name,
                    desc: formData.desc,
                    auth_keys: formData.auth_keys,
                })
                    .then((res: any) => {
                        console.log('res', res)
                    })
                    .catch((err: any) => {
                        console.log('err', err)
                    })
            }

            // 角色详情
            const roleDetail = () => {
                apiRoleDetail({
                    id: identity.value,
                })
                    .then((res: any) => {
                        console.log('res', res)

                        Object.keys(res).map((item) => {
                            // this.$set(this.form, item, res[item])
                            // formData[item] = res[item]
                        })
                        // this.form.auth_keys = []
                        formData.auth_keys = []
                        // const ref = this.$refs['permissionsTree'] as any
                        // ref.setCheckedKeys(res.auth_keys);
                    })
                    .catch((err: any) => {
                        console.log('err', err)
                    })
            }

            // 权限树触发函数
            const handlePermissionsCheckChange = (data: any, checked: boolean)  => {
                console.log(data)
                if (!data.auth_key) {
                    return
                }
                let index = formData.auth_keys.findIndex(
                    (item) => item == data.auth_key
                )
                if (checked) {
                    index == -1 && (formData.auth_keys as any).push(data.auth_key)
                    return
                }

                if (index != -1) {
                    formData.auth_keys.splice(index, 1)
                }
            }

            onMounted(() => {
                const query: any = route.query
                if (query.mode) mode.value = query.mode

                if (mode.value === PageMode['EDIT']) {
                    identity.value = query.id * 1
                    roleDetail()
                }

                getMenu()
            })

            return {
                mode,
                identity,
                formData,
                formRef,
                rules,
                getMenu,
                roleAdd,
                roleEdit,
                roleDetail,
                onSubmit,
                handlePermissionsCheckChange,
            }
        },
    })
</script>

<style lang="scss" scoped>
    .role-edit {
        ::v-deep .el-textarea {
            width: 340px;
        }
    }
</style>
