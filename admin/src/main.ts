import { createApp } from 'vue'
import App from './App.vue'
import install from './install'
import './permission'
import './styles/index.scss'
const app = createApp(App)
import 'virtual:svg-icons-register'
app.use(install)
app.mount('#app')
