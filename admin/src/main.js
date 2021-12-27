import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import useElement from './plugins/element'
import useVueEcharts from './plugins/vue-echarts'
import cache from './utils/cache'
// 缓存配置
cache.setKey('admin')
const app = createApp(App)

// element
useElement(app)
// vue-echarts
useVueEcharts(app)

app.use(store).use(router).mount('#app')
