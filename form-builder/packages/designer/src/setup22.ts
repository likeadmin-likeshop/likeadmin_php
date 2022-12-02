import * as widgets from '@form-builder/widgets'
import { logo } from '@form-builder/assets'
import Layout from './layouts/index.vue'
import components from './layouts/components'
import type { Designer } from './designer'
import type { App } from 'vue'
export function setupDefault(designer: Designer, app: App) {
  designer.skeleton.add({
    title: '组件库',
    name: 'componentLib',
    area: 'left',
    content: components.ComponentLib
  })
  designer.skeleton.add({
    title: '大纲树',
    name: 'outlineTree',
    area: 'left',
    content: components.OutlineTree
  })
  designer.skeleton.add({
    name: 'logo',
    align: 'left',
    area: 'top',
    content: components.Logo,
    contentProps: {
      src: logo,
      title: '表单设计器'
    }
  })
  designer.skeleton.add({
    name: 'logo',
    align: 'left',
    area: 'top',
    content: components.Logo,
    contentProps: {
      src: logo,
      title: '表单设计器'
    }
  })
  designer.skeleton.add({
    name: 'logo',
    area: 'main',
    content: components.MainDisplay
  })

  designer.skeleton.add({
    title: '字段属性',
    name: 'fieldProps',
    area: 'right',
    content: components.FieldProps
  })
  designer.skeleton.add({
    title: '表单属性',
    name: 'formProps',
    area: 'right',
    content: components.FormProps
  })
  app.component('FormDesigner', Layout)
  for (const [, widget] of Object.entries(widgets)) {
    designer.material.add(widget.meta)
    app.component(widget.meta.name, widget.widget)
  }
}
