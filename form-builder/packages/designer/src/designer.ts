import { uniqueId } from '@form-builder/shared'
import { cloneDeep, merge } from 'lodash'
import { Skeleton } from './skeleton'
import { designerConfig } from './constant'
import { Material } from './material'
import { Toolbar } from './toolbar'
import type { DesignerConfig } from './types'
export class Designer {
  config!: DesignerConfig
  formWidgets: any[] = []
  formWidgetsMap: Map<any, any> = new Map()
  toolbar: Toolbar = new Toolbar()
  material: Material = new Material()
  skeleton: Skeleton
  selectedId: string | null = null
  constructor(config?: DesignerConfig) {
    if (!config) {
      this.config = designerConfig
    }
    this.config = merge({}, designerConfig, config)
    this.skeleton = new Skeleton()
  }

  addWidget(widget: any) {
    console.log(widget)
    // if(this.formWidgetsMap.) {

    // }
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
  removeWidget(widget: any) {
    const parent = this.getWidgetParent(widget)
    parent
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

  getWidgetName(widget: any) {
    return widget.name + widget
  }
}
