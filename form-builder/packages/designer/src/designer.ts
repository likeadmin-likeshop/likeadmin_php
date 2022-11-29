import { uniqueId } from '@form-builder/shared'
import { cloneDeep, merge } from 'lodash'
import { designerConfig } from './constant'
import { Material } from './material'
import { Toolbar } from './toolbar'
import type { DesignerConfig } from './types'
export class Designer {
  config!: DesignerConfig
  formWidgets: any[] = []
  toolbar: Toolbar = new Toolbar()
  material: Material = new Material()
  selectedId: string | null = null
  constructor(config?: DesignerConfig) {
    if (!config) {
      this.config = designerConfig
    }
    this.config = merge({}, designerConfig, config)
  }
  cloneWidget(widget: any) {
    const newWidget = cloneDeep(widget)
    newWidget.id = uniqueId(widget.name)
    return newWidget
  }
  copyWidget(widget: any) {
    const parent = this.getWidgetParent(widget)
    parent.push(this.cloneWidget(widget))
  }
  getWidgetParent(widget: any) {
    const queue = this.formWidgets.map((item) => ({
      ...item,
      parent: this.formWidgets
    }))

    while (queue.length) {
      const item = queue.shift()
      if (item.id === widget.id) {
        return item.parent
      }
      if (item.children) {
        item.children.forEach((child: any) => {
          queue.push({ ...child, parent: item.children })
        })
      }
    }
  }
  setSelectWidget(widget: any) {
    if (widget.id) {
      this.selectedId = widget.id
    }
  }
  isSelectWidget(widget: any) {
    return this.selectedId == widget.id
  }
}
