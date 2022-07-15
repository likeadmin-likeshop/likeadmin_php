import { createApp } from 'vue'
import App from './App.vue'
import install from './install'
import './permission'
import './styles/index.scss'
const app = createApp(App)
app.use(install)
app.mount('#app')
