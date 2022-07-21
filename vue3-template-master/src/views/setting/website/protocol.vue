<template>
  <el-card shadow="never">
    <template #header>
      <span class="md f-w-600">服务协议</span>
    </template>
    <el-form :model="formData" label-width="80px" inline>
      <el-form-item label="协议名称">
        <el-input class="ls-input" v-model="formData.service_title" />
      </el-form-item>
    </el-form>

    <!-- Main Editor Start -->
    <!-- <editor v-model="formData.service_content" width="1000" height="664" class="m-l-14"></editor> -->
    <!-- Main Editor End -->
  </el-card>
  <el-card shadow="never" class="m-t-15">
    <template #header>
      <span class="md f-w-600">隐私协议</span>
    </template>
    <el-form :model="formData" label-width="80px" inline>
      <el-form-item label="协议名称">
        <el-input class="ls-input" v-model="formData.privacy_title" />
      </el-form-item>
    </el-form>

    <!-- Main Editor Start -->
    <!-- <editor v-model="formData.privacy_content" width="1000" height="664" class="m-l-14"></editor> -->
    <!-- Main Editor End -->
  </el-card>

  <footer-btns v-perms="['setting.web.web_setting/setAgreement']">
    <el-button type="primary" @click="handleProtocolEdit">保存</el-button>
  </footer-btns>
</template>

<script setup lang="ts">
import { apiGetProtocol, apiSetProtocol } from '@/api/setting'

interface formDataObj {
  service_title: string
  service_content: string
  privacy_title: string
  privacy_content: string
}
const formData = ref<formDataObj>({
  service_title: '',
  service_content: '',
  privacy_title: '',
  privacy_content: ''
})
const protocolGet = async (): Promise<void> => {
  ;(formData.value as object) = await apiGetProtocol()
}
const handleProtocolEdit = async (): Promise<void> => {
  await apiSetProtocol({ ...formData.value })
  protocolGet()
}
protocolGet()
</script>
