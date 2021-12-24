import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import useElement from './plugins/element'
const app = createApp(App)
useElement(app)
app.use(store).use(router).mount('#app')
