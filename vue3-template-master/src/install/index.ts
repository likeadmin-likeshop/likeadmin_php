import type { App } from 'vue'
const modules = import.meta.globEager('./**/*')

// 安装方法，执行某一类相同操作
function install(app: App<Element>) {
  Object.keys(modules).forEach((key) => {
    const name = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
    const type = key.replace(/^\.\/([\w-]+).*/gi, '$1')
    switch (type) {
      // 用于注册全局指令
      case 'directives':
        app.directive(name, modules[key].default)
        break
      // 使用插件
      case 'plugins':
        // eslint-disable-next-line no-case-declarations
        const installFun = modules[key].default
        typeof installFun === 'function' && installFun(app)
        break
    }
  })
}

export default {
  install
}
