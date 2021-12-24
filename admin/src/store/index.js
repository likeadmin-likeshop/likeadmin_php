
import  { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = require.context('./modules', true, /\.js$/)

// 自动载入modules中的模块文件其所有模块
const modules = modulesFiles.keys().reduce((modules, path) => {
    // './user.js' -> 'user'
    const name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(path)
    modules[name] = value.default
    return modules
}, {})

const store = createStore({
    modules,
    getters
})

export default store
