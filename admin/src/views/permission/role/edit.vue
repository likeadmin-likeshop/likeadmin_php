<template>
    <div class="role-edit">
        <el-card shadow="never">
            <el-page-header content="编辑角色" @back="$router.back()" />
        </el-card>

        <el-card shadow="never" class="m-t-15">
            <el-form :rules="rules" ref="form" class="ls-form" :model="formData" label-width="150px" size="small">
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
        onMounted
    } from "vue";
    import {
        apiConfigGetMenu,
        apiConfigGetAuth
    } from '@/api/auth'
    export default defineComponent({
        setup() {
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

            // 获取权限菜单
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


            // const getAuth = () => {
            //     apiConfigGetAuth()
            //         .then((res: any) => {
            //             console.log('res', res)
            //         })
            //         .catch((err: any) => {
            //             console.log('err', err)
            //         })
            // }

            onMounted(() => {
                getMenu()
                // getAuth()
            })

            return {
                formData,
                getMenu,
                // getAuth,
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
