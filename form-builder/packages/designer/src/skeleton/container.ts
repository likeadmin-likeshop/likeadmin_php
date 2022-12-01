import { isString } from '@form-builder/shared'

export interface WidgetItem {
  name: string
}

export default class WidgetContainer<T extends WidgetItem = any> {
  items: T[] = []

  private maps: Map<string, T> = new Map()

  constructor(readonly name: string) {}

  add(item: T): T {
    const origin = this.get(item.name)
    if (origin === item) return origin
    const index = origin ? this.indexOf(origin) : -1
    if (index > -1) {
      this.items[index] = item
    } else {
      this.items.push(item)
    }
    this.maps.set(item.name, item)
    return item
  }

  get(name: string): T | null {
    return this.maps.get(name) || null
  }

  getAt(index: number): T | null {
    return this.items[index]
  }

  has(name: string): boolean {
    return this.maps.has(name)
  }

  indexOf(item: T): number {
    return this.items.indexOf(item)
  }

  remove(item: string | T): number {
    const target = isString(item) ? this.get(item) : item
    if (!target) {
      return -1
    }
    const index = this.indexOf(target)
    if (index > -1) {
      this.items.splice(index, -1)
      this.maps.delete(target.name)
    }
    return index
  }
}
