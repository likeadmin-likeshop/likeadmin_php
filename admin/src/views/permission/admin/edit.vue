<template>
    <div class="admin">
        <el-card shadow="never">
            <el-page-header :content="id ? '编辑管理员' : '新增管理员'" @back="$router.back()" />
        </el-card>
        <el-card v-loading="loading" shadow="never" class="m-t-15">
            <el-form
                ref="formRefs"
                :rules="rules"
                class="ls-form"
                :model="formData"
                label-width="150px"
                size="small"
            >
                <!-- 账号输入框 -->
                <el-form-item label="账号：" prop="account">
                    <el-input v-model="formData.account" placeholder="请输入账号"></el-input>
                </el-form-item>
                <!-- 管理员头像 -->
                <el-form-item label="头像：">
                    <material-select v-model="formData.avatar" :limit="1"></material-select>
                    <div class="muted">建议尺寸：100*100px，支持jpg，jpeg，png格式</div>
                </el-form-item>

                <!-- 名称输入框 -->
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
                </el-form-item>

                <!-- 角色选择框 -->
                <el-form-item label="角色：" prop="role_id">
                    <el-select v-model="formData.role_id" placeholder="请选择角色">
                        <el-option
                            v-for="(item, index) in roleList"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <!-- 密码输入框 -->
                <el-form-item label="密码：" prop="password">
                    <el-input
                        v-model="formData.password"
                        show-password
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>

                <!-- 确认密码输入框 -->
                <el-form-item label="确认密码：" prop="password_confirm">
                    <el-input
                        v-model="formData.password_confirm"
                        show-password
                        placeholder="请输入确认密码"
                    ></el-input>
                </el-form-item>

                <!-- 管理员状态 -->
                <el-form-item label="管理员状态">
                    <el-switch v-model="formData.disable" :active-value="0" :inactive-value="1" />
                </el-form-item>

                <!-- 多处登录 -->
                <el-form-item label="支持多处登录">
                    <el-switch
                        v-model="formData.multipoint_login"
                        :active-value="1"
                        :inactive-value="0"
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
import { computed, defineComponent, onMounted, reactive, Ref, ref, toRefs } from 'vue'
import MaterialSelect from '@/components/material-select/index.vue'
import FooterBtns from '@/components/footer-btns/index.vue'
import { apiRoleLists, apiAdminDetail, apiAdminAdd, apiAdminEdit } from '@/api/auth'
import { ElForm } from 'element-plus'
import { useAdmin } from '@/core/hooks/app'
export default defineComponent({
    components: {
        MaterialSelect,
        FooterBtns
    },
    setup() {
        const formRefs: Ref<typeof ElForm | null> = ref(null)
        const { router, route } = useAdmin()
        const id = computed(() => route.query?.id)
        const loading = ref(false)
        // 表单数据
        const roleList: Ref<any[]> = ref([])
        const { formData, rules } = toRefs(
            reactive({
                formData: {
                    account: '',
                    name: '',
                    role_id: '',
                    avatar: '',
                    password: '',
                    password_confirm: '',
                    disable: 0,
                    multipoint_login: 0
                },
                rules: {
                    account: [
                        {
                            required: true,
                            message: '请输入账号',
                            trigger: ['blur']
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: '请输入名称',
                            trigger: ['blur']
                        }
                    ],
                    role_id: [
                        {
                            required: true,
                            message: '请选择角色',
                            trigger: ['blur']
                        }
                    ],
                    password: [] as any[],
                    password_confirm: [] as any[]
                }
            })
        )

        const getRoleList = () => {
            apiRoleLists({
                page_type: 1
            }).then((res: any) => {
                roleList.value = res.lists
            })
        }
        const getAdminDetail = () => {
            if (!id.value) {
                rules.value.password = [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: ['blur']
                    }
                ]
                rules.value.password_confirm = [
                    {
                        required: true,
                        message: '请输入确认密码',
                        trigger: ['blur']
                    }
                ]
                return
            }
            loading.value = true
            apiAdminDetail({
                id: id.value
            })
                .then((res: any) => {
                    formData.value = res
                })
                .finally(() => {
                    loading.value = false
                })
        }

        const onSubmit = () => {
            formRefs.value?.validate((valid: boolean) => {
                if (!valid) {
                    return
                }
                const promise = id.value
                    ? apiAdminEdit({ ...formData.value, id: id.value })
                    : apiAdminAdd(formData.value)
                promise.then(() => {
                    setTimeout(() => router.go(-1), 500)
                })
            })
        }

        onMounted(() => {
            getAdminDetail()
            getRoleList()
        })

        return {
            id,
            formRefs,
            loading,
            formData,
            rules,
            roleList,
            onSubmit
        }
    }
})
</script>

<style lang="scss" scoped></style>
