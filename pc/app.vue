<script lang="ts" setup>
import { ID_INJECTION_KEY, ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { getConfig } from './api/app'
import { getUserCenter } from './api/user'
import { useAppStore } from './stores/app'
import { useUserStore } from './stores/user'
provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0
})
const config = {
    locale: zhCn
}
const { setConfig } = useAppStore()
const { setUser } = useUserStore()
const { data: configData } = await useAsyncData(() => getConfig())
if (configData.value) setConfig(configData.value)
const { data: userData } = await useAsyncData(() => getUserCenter())
if (userData.value) setUser(userData.value)
</script>
<template>
    <ElConfigProvider v-bind="config">
        <NuxtLayout>
            <NuxtLoadingIndicator color="#4a5dff" :height="2" />
            <NuxtPage />
        </NuxtLayout>
    </ElConfigProvider>
</template>
