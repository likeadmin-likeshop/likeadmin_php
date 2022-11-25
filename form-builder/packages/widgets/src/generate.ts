import { Material } from './options'
import * as widgets from './widget'
const material = new Material()

const categorys = [
  { title: '布局字段', name: 'layout' },
  { name: 'base', title: '基础字段' }
]
categorys.forEach((item) => {
  material.addCategory(item)
})
for (const [, widget] of Object.entries(widgets)) {
  material.addWidget((widget as any).meta)
}

export default material
