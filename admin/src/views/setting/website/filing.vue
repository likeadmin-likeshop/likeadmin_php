<!-- 备案信息 -->
<template>
    <div class="website-filing">
        <el-card shadow="never" class="">
            <el-form
                :rules="rules"
                ref="form"
                class="ls-form"
                :model="form"
                label-width="150px"
                size="small"
            >
                <!-- 版权信息输入框 -->
                <el-form-item label="版权信息" prop="account">
                    <el-input
                        v-model="formData.account"
                        placeholder="请输入版权信息"
                    ></el-input>
                    <div class="muted xs m-r-16">例如填写，Copyright © 2019-2020 公司名称</div>
                </el-form-item>

                <!-- ICP备案号输入框 -->
                <el-form-item label="ICP备案号" prop="nickname">
                    <el-input
                        v-model="formData.nickname"
                        placeholder="请输入ICP备案号"
                    ></el-input>
                </el-form-item>

                <!-- ICP备案号链接输入框 -->
                <el-form-item label="ICP备案号链接" prop="roleId">
                    <el-input
                        v-model="formData.roleId"
                        placeholder="请输入ICP备案号链接"
                    ></el-input>
                    <div class="muted xs m-r-16">例如填写域名信息备案系统链接，http://beian.miit.gov.cn</div>
                </el-form-item>

                <!--公安备案号输入框 -->
                <el-form-item label="公安备案号" prop="password">
                    <el-input
                        v-model="formData.password"
                        show-password
                        placeholder="请输入公安备案号"
                    ></el-input>
                </el-form-item>

                <!-- 公安备案号链接输入框 -->
                <el-form-item label="公安备案号链接" prop="passwordConfirm">
                    <el-input
                        v-model="formData.passwordConfirm"
                        show-password
                        placeholder="请输入公安备案号链接"
                    ></el-input>
                    <div class="muted xs m-r-16">例如填写公安信息备案系统链接，http://www.beian.gov.cn</div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
    setup() {
       // 表单数据
       const formData = reactive({
           account: '',
           name: '',
           role: '',
           image: '',
       })

       return {
           formData,
       }
    },
})
</script>

<style lang="scss" scoped>
</style>
