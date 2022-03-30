<!-- 用户设置 -->
<template>
    <!-- 用户mortar Start -->
    <el-card shadow="never" class="m-t-16">
        <template #header>
            <span> 基本设置 </span>
        </template>

        <el-form ref="formRef" :model="formData" label-width="100px" size="small">
            <el-form-item label="用户默认头像" prop="default_avatar">
                <material-select v-model="formData.default_avatar" :limit="1"></material-select>
                <div class="muted">建议尺寸：400*400，支持jpg、png格式</div>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- 用户mortar End  -->

    <!-- Footer Start -->
    <footer-btns>
        <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
    </footer-btns>
    <!-- Footer End -->
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { apiUserConfigGet, apiUserConfigSet } from '@/api/setting'
    import materialSelect from '@/components/material-select/index.vue'
    import FooterBtns from '@/components/footer-btns/index.vue'

    /** Data Start **/
    const formData = ref<any>({
        default_avatar: '', //	string	客服二维码
        wechat: '', //	string	客服微信号
    })
    /** Data End **/

    /** Methods Start **/
    // 获取用户设置
    const getUserConfig = async (): Promise<void> => {
        formData.value = await apiUserConfigGet()
    }
    // 编辑用户设置
    const handleUserConfigEdit = async (): Promise<void> => {
        await apiUserConfigSet({ ...formData.value })
        getUserConfig()
    }
    // 提交数据
    const onSubmit = () => {
        handleUserConfigEdit()
    }
    /** Methods End **/

    /** LifeCycle Start **/
    getUserConfig()
    /** LifeCycle End **/
</script>

<style lang="scss" scoped></style>
