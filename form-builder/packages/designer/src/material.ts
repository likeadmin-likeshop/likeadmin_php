import { uniqueId } from '@form-builder/shared'

export interface ComponentItem {
  id: string
  title: string
  children: Record<string, any>[]
}

export class Material {
  widgetsMap: Map<string, Record<string, any>> = new Map()
  widgets: Record<string, any>[] = []
  add(widget: Record<string, any>) {
    const { type } = widget
    try {
      if (this.widgetsMap.has(type)) {
        return widget
      }
      this.widgets.push(widget)
      this.widgetsMap.set(type, widget)
    } catch (error) {
      console.error(error)
    }
  }
  get componentLists(): ComponentItem[] {
    const result: ComponentItem[] = []
    const map = new Map()
    this.widgets.forEach((item) => {
      const parent = map.get(item.category)
      if (parent && parent.id) {
        parent.children.push(item)
      } else {
        const newParent = {
          title: item.category,
          children: [item],
          id: uniqueId('category')
        }
        map.set(item.category, newParent)
        result.push(newParent)
      }
    })
    return result
  }
}
