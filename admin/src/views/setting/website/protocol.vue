<template>
    <!-- 服务协议 Start -->
    <el-card shadow="never">
        <template #header>
            <span class="md f-w-600">服务协议</span>
        </template>
        <!-- Header Form Start -->
        <el-form :model="formData" label-width="80px" size="mini" inline>
            <el-form-item label="协议名称">
                <el-input class="ls-input" v-model="formData.service_title" />
            </el-form-item>
        </el-form>
        <!-- Header Form End -->

        <!-- Main Editor Start -->
        <editor
            v-model="formData.service_content"
            width="1000"
            height="664"
            class="m-l-14"
        ></editor>
        <!-- Main Editor End -->
    </el-card>
    <!-- 服务协议 End -->

    <!-- 隐私协议 Start -->
    <el-card shadow="never" class="m-t-15">
        <template #header>
            <span class="md f-w-600">隐私协议</span>
        </template>
        <!-- Header Form Start -->
        <el-form :model="formData" label-width="80px" size="mini" inline>
            <el-form-item label="协议名称">
                <el-input class="ls-input" v-model="formData.privacy_title" />
            </el-form-item>
        </el-form>
        <!-- Header Form End -->

        <!-- Main Editor Start -->
        <editor
            v-model="formData.privacy_content"
            width="1000"
            height="664"
            class="m-l-14"
        ></editor>
        <!-- Main Editor End -->
    </el-card>
    <!-- 政策协议 End -->

    <!-- Footer Start -->
    <footer-btns>
        <el-button type="primary" size="small" @click="handleProtocolEdit">保存</el-button>
    </footer-btns>
    <!-- Footer End -->
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { apiGetProtocol, apiSetProtocol } from '@/api/setting'
    import Editor from '@/components/editor/index.vue'
    import FooterBtns from '@/components/footer-btns/index.vue'

    /** Interface Star **/
    interface formDataObj {
        service_title: string
        service_content: string
        privacy_title: string
        privacy_content: string
    }
    /** Interface End **/

    /** Data Start **/
    let formData = ref<formDataObj>({
        service_title: '',
        service_content: '',
        privacy_title: '',
        privacy_content: '',
    })
    /** Data End **/

    /** Methods Start **/
    const protocolGet = async (): Promise<void> => {
        ;(formData.value as object) = await apiGetProtocol()
    }
    const handleProtocolEdit = async (): Promise<void> => {
        await apiSetProtocol({ ...formData.value })
        protocolGet()
    }
    /** Methods End **/

    /** Life Cycle Start **/
    protocolGet()
    /** Life Cycle End **/
</script>
