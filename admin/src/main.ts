import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { injectionKey } from './store'
import './permission'
import useElement from './plugins/element'
import useVueEcharts from './plugins/vue-echarts'
import cache from './utils/cache'
import { storeKey } from './config/app'
import vars from '@/styles/export.scss'
// 缓存配置
cache.setKey(storeKey)
const app = createApp(App)
app.config.globalProperties.$variables = vars
// element
useElement(app)
// vue-echarts
useVueEcharts(app)

app.use(router).use(store, injectionKey).mount('#app')
