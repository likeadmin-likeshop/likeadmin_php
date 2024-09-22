<script lang="ts" setup>
import { ID_INJECTION_KEY, ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useAppStore } from './stores/app'

provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0
})
const config = {
    locale: zhCn
}
const appStore = useAppStore()
const { pc_title, pc_ico, pc_keywords, pc_desc } = appStore.getWebsiteConfig
const { clarity_code } = appStore.getSiteStatistics
const headOptions: any = {
    title: pc_title,
    meta: [
        { name: 'description', content: pc_desc },
        { name: 'keywords', content: pc_keywords }
    ],
    link: [
        {
            rel: 'icon',
            href: pc_ico
        }
    ],
    script: []
}

if (clarity_code) {
    headOptions.script.push({
        type: 'text/javascript',
        innerHTML: `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${clarity_code}");
      `
    })
}
useHead(headOptions)
</script>
<template>
    <ElConfigProvider v-bind="config">
        <NuxtLayout>
            <NuxtLoadingIndicator color="#4a5dff" :height="2" />
            <NuxtPage />
        </NuxtLayout>
    </ElConfigProvider>
</template>
