import { createApp } from 'vue'
import formBuilder from 'form-builder/src/index'
import '@form-builder/designer/src/styles/index.scss'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
const app = createApp(App)
app.use(formBuilder)
app.mount('#app')
