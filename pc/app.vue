<script lang="ts" setup>
import { ID_INJECTION_KEY, ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { getConfig } from './api/app'
provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0
})
const config = {
    locale: zhCn
}
const { data, error } = await useLazyAsyncData(() => getConfig())
console.log(data.value, error.value)
</script>
<template>
    <ElConfigProvider v-bind="config">
        <NuxtLayout>
            <NuxtLoadingIndicator color="#4a5dff" :height="2" />
            <NuxtPage />
        </NuxtLayout>
    </ElConfigProvider>
</template>
