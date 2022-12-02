import WidgetContainer from './container'
import type { WidgetConfig } from '@form-builder/types'

export default class Area<T extends WidgetConfig = WidgetConfig> {
  private _visible = true
  get visible() {
    return this._visible
  }
  readonly container: WidgetContainer<T>
  constructor(readonly name: string) {
    this.container = new WidgetContainer(name)
  }
  add(config: T): T {
    const item = this.container.get(config.name)
    if (item) {
      return item
    }
    return this.container.add(config)
  }
  remove(config: T | string): number {
    return this.container.remove(config)
  }
  get(name: string) {
    return this.container.get(name)
  }

  hide() {
    this._visible = false
  }

  show() {
    this._visible = true
  }
}
