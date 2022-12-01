import Area from './area'
import type { WidgetConfig } from './types'

export class Skeleton {
  readonly leftArea: Area<WidgetConfig>
  constructor() {
    this.leftArea = new Area('left')
  }
  add(config: WidgetConfig) {
    const { area } = config
    switch (area) {
      case 'left':
        return this.leftArea.add(config)
    }
  }
}
