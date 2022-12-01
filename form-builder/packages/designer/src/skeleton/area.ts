import WidgetContainer from './container'
import type { WidgetConfig } from './types'

export default class Area<T extends WidgetConfig = any> {
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
}
