import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { injectionKey } from './store'
import './permission'
import useElement from './plugins/element'
import useVueEcharts from './plugins/vue-echarts'
import vars from '@/styles/export.scss'
import copyDirectives from './core/directives/copy'
const app = createApp(App)
app.config.globalProperties.$variables = vars
// element
useElement(app)
// vue-echarts
useVueEcharts(app)

copyDirectives(app)
app.use(router).use(store, injectionKey).mount('#app')
