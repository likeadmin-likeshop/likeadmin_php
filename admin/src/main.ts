import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { injectionKey } from './store'
import './permission'
import useElement from './plugins/element'
import useVueEcharts from './plugins/vue-echarts'
import vars, { Variables } from './styles/export.module.scss'
import useDirectives from './core/directives'
const app = createApp(App)
app.config.globalProperties.$variables = vars
// element
useElement(app)
// vue-echarts
useVueEcharts(app)
// 添加自定义指令
useDirectives(app)

app.use(router).use(store, injectionKey).mount('#app')

// 声明vue上的属性
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $variables: Variables
    }
}
