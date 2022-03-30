<template>
    <!-- Header Start -->
    <el-card shadow="never">
        <el-page-header @back="$router.back()" content="短信设置" />
    </el-card>
    <!-- Header End -->

    <!-- Main Start -->
    <el-card shadow="never" class="m-t-15">
        <el-form ref="form" label-width="135px">
            <el-form-item label="短信渠道">{{ formData.name }}</el-form-item>

            <el-form-item label="开启状态" required>
                <el-radio
                    v-model="formData.status"
                    :label="typeof formData.status == 'string' ? '0' : 0"
                    >关闭</el-radio
                >
                <el-radio
                    v-model="formData.status"
                    :label="typeof formData.status == 'string' ? '1' : 1"
                    >开启</el-radio
                >
            </el-form-item>

            <el-form-item label="短信签名" size="mini" required>
                <el-input class="ls-input" v-model="formData.sign"></el-input>
            </el-form-item>

            <el-form-item v-if="type == 'tencent'" label="APP_ID" size="mini" required>
                <el-input class="ls-input" v-model="formData.app_id"></el-input>
            </el-form-item>

            <el-form-item label="APP_KEY" v-if="type == 'ali'" size="mini" required>
                <el-input class="ls-input" v-model="formData.app_key"></el-input>
            </el-form-item>

            <el-form-item v-if="type == 'tencent'" label="SECRET_ID" size="mini" required>
                <el-input class="ls-input" v-model="formData.secret_id"></el-input>
            </el-form-item>

            <el-form-item label="SECRET_KEY" size="mini" required>
                <el-input class="ls-input" v-model="formData.secret_key"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- Main End -->

    <!-- Footer Start -->
    <footer-btns>
        <el-button type="primary" size="small" @click="onSubmit()">保存</el-button>
    </footer-btns>
    <!-- Footer End -->
</template>

<script lang="ts" setup>
    import { apiSmsDetail, apiSmsEdit } from '@/api/application'
    import { ref } from 'vue'
    import FooterBtns from '@/components/footer-btns/index.vue'
    import { useAdmin } from '@/core/hooks/app'
    import { number } from 'echarts/core'

    /** Interface Start **/
    interface formDataObj {
        name: string
        app_key: string
        status: number
        sign: string
        secret_id: string
        app_id: string
        secret_key: string
    }
    /** Interface End **/

    /** Data Start **/
    const { router, route } = useAdmin()
    const type = ref<any>(route.query.type)
    const formData = ref<formDataObj>({
        name: '',
        app_key: '',
        status: 1,
        sign: '',
        secret_id: '',
        app_id: '',
        secret_key: '',
    })
    /** Data End **/

    /** Methods Start **/
    // 详情
    const getSmsDetail = async (): Promise<void> => {
        ;(formData.value as object) = await apiSmsDetail({ type: type.value })
    }
    const onSubmit = async (): Promise<void> => {
        await apiSmsEdit({ ...formData.value, type: type.value })
        router.back()
    }
    /** Methods End **/

    /** Life Cycle Start **/
    if (type.value) getSmsDetail()
    /** Life Cycle End **/
</script>

<style lang="scss" scoped>
    .ls-input {
        width: 305px;
    }
</style>
