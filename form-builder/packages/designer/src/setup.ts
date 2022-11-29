import * as widgets from '@form-builder/widgets'
import Layout from './layouts/index.vue'
import components from './components'
import type { Designer } from './designer'
import type { App } from 'vue'
export function setupComponent(app: App) {
  app.component(Layout.name, Layout)
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component)
  }
}

export function setupDefault(designer: Designer, app: App) {
  designer.toolbar.add({
    title: '组件库',
    name: 'componentLib',
    component: 'ComponentLib'
  })
  designer.toolbar.add({
    title: '大纲树',
    name: 'outlineTree',
    component: 'OutlineTree'
  })
  for (const [, widget] of Object.entries(widgets)) {
    designer.material.add(widget.meta)
    app.use(widget)
  }
}
