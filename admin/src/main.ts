import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { injectionKey } from './store'
import './permission'
import useElement from './plugins/element'
import useVueEcharts from './plugins/vue-echarts'
import vars, { Variables } from './styles/export.module.scss'
import useDirectives from './core/directives'
import VForm3 from 'vform3-builds'  //引入VForm3库
import 'vform3-builds/dist/designer.style.css'  //引入VForm3样式

const app = createApp(App)
app.config.globalProperties.$variables = vars


// 添加自定义指令
useDirectives(app)
// element
useElement(app)
// vue-echarts
useVueEcharts(app)

app.use(router).use(store, injectionKey).use(VForm3)

app.mount('#app')
// 声明vue上的属性
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $variables: Variables
    }
}
