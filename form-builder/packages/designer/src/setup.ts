import * as widgets from '@form-builder/widgets'
import Layout from './layouts/index.vue'
import components from './components'
import type { Designer } from './designer'
import type { App } from 'vue'

export function setupDefault(designer: Designer, app: App) {
  designer.skeleton.add({
    title: '组件库',
    name: 'componentLib',
    area: 'left',
    content: 'ComponentLib'
  })
  // designer.toolbar.add({
  //   title: '组件库',
  //   name: 'componentLib',
  //   component: 'ComponentLib'
  // })
  // designer.toolbar.add({
  //   title: '大纲树',
  //   name: 'outlineTree',
  //   component: 'OutlineTree'
  // })

  app.component('FormDesigner', Layout)
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component)
  }
  for (const [, widget] of Object.entries(widgets)) {
    designer.material.add(widget.meta)
    app.use(widget)
  }
}
