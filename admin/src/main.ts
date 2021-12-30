import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { injectionKey } from './store'
import './permission'
import useElement from './plugins/element'
import useVueEcharts from './plugins/vue-echarts'
import vars from '@/styles/export.scss'
import useDirectives from './core/directives'
const app = createApp(App)
app.config.globalProperties.$variables = vars
// element
useElement(app)
// vue-echarts
useVueEcharts(app)
// 添加自定义指令
useDirectives(app)
// copyDirectives(app)
app.use(router).use(store, injectionKey).mount('#app')
