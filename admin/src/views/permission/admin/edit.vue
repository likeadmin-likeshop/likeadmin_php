<template>
    <div class="admin">
        <el-card shadow="never">
            <el-page-header content="编辑管理员" @back="$router.back()" />
        </el-card>
        <el-card shadow="never" class="m-t-15">
            <el-form
                :rules="rules"
                ref="form"
                class="ls-form"
                :model="form"
                label-width="150px"
                size="small"
            >
                <!-- 账号输入框 -->
                <el-form-item label="账号：" prop="account">
                    <el-input
                        v-model="formData.account"
                        placeholder="请输入账号"
                    ></el-input>
                </el-form-item>

                <!-- 名称输入框 -->
                <el-form-item label="名称" prop="nickname">
                    <el-input
                        v-model="formData.nickname"
                        placeholder="请输入名称"
                    ></el-input>
                </el-form-item>

                <!-- 角色选择框 -->
                <el-form-item label="角色" prop="roleId">
                    <el-select
                        v-model="formData.roleId"
                        placeholder="请选择角色"
                    >
                        <!-- <el-option
                            v-for="(item, index) in roleList"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option> -->
                    </el-select>
                </el-form-item>

                <!-- 密码输入框 -->
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="formData.password"
                        show-password
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>

                <!-- 确认密码输入框 -->
                <el-form-item label="确认密码" prop="passwordConfirm">
                    <el-input
                        v-model="formData.passwordConfirm"
                        show-password
                        placeholder="请输入确认密码"
                    ></el-input>
                </el-form-item>

                <!-- 管理员状态 -->
                <el-form-item label="管理员状态">
                    <el-switch
                        v-model="formData.isDisable"
                        :active-value="0"
                        :inactive-value="1"
                    />
                </el-form-item>

                <!-- 多处登录 -->
                <el-form-item label="支持多处登录">
                    <el-switch
                        v-model="formData.multipoint_login"
                        :active-value="1"
                        :inactive-value="0"
                    />
                </el-form-item>

                <el-form-item label="管理员头像">
                    <!-- <AvatarUploader v-model="formData.avatar" :data="{ dir: 'avatar' }" /> -->
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup() {
        // 表单数据
        const formData = reactive({
            account: '',
            name: '',
            role: '',
        })

        return {
            formData,
        }
    },
}
</script>

<style lang="scss" scoped>
.ls-form {
    margin-bottom: -16px;
}
</style>
