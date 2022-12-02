import Area from './area'
import type { WidgetConfig, WidgetConfigArea } from '@form-builder/types'

export class Skeleton {
  leftArea!: Area<WidgetConfig>
  rightArea!: Area<WidgetConfig>
  mainArea!: Area<WidgetConfig>
  topArea!: Area<WidgetConfig>
  mainTopArea!: Area<WidgetConfig>
  readonly maps: Map<string, Area> = new Map()
  constructor() {
    this.createArea('left')
    this.createArea('top')
    this.createArea('main')
    this.createArea('right')
    this.createArea('mainTop')
  }

  createArea(name: WidgetConfigArea) {
    this[`${name}Area`] = new Area(name)
    this.maps.set(name, this[`${name}Area`])
  }
  add(config: WidgetConfig) {
    const { area } = config
    const areaInstance = this.maps.get(area)
    if (areaInstance) {
      areaInstance.add(config)
    }
  }

  remove(config: WidgetConfig) {
    const { area } = config
    const areaInstance = this.maps.get(area)
    if (areaInstance) {
      areaInstance.remove(config.name)
    }
  }
}
