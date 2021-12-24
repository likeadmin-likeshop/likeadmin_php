import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import useElement from './plugins/element'
import cache from './utils/cache'
const app = createApp(App)
// 缓存配置
cache.setKey('admin')
// element
useElement(app)
app.use(store).use(router).mount('#app')
