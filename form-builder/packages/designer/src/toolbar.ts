import type { Component } from 'vue'

// export interface WidgetsCategory {
//   name: string
//   title: string
//   widgets?: Record<string, any>[]
// }

export interface TabBar {
  name: string
  title: string
  component: string | Component
}

export class Toolbar {
  tabBars: TabBar[] = []

  constructor() {}

  addTabBar(tabBar: TabBar) {
    const isHas = this.tabBars.find((item) => item.name === tabBar.name)
    if (isHas) {
      return tabBar
    }
    return this.tabBars.push(tabBar)
  }
  removeTabBar(name: string | number) {
    if (typeof name === 'number') {
      this.tabBars.splice(name, 1)
      return
    }
    const removeIndex = this.tabBars.findIndex((item) => item.name === name)
    if (removeIndex == -1) {
      return
    }
    this.tabBars.splice(removeIndex, 1)
  }
  // init() {
  //   this.categorys.forEach((item) => {
  //     this.addCategory(item)
  //   })
  //   for (const [, widget] of Object.entries(this.widgets)) {
  //     this.addWidget((widget as any).meta)
  //   }
  // }
}
