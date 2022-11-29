import type { Component } from 'vue'

export interface TabBar {
  name: string
  title: string
  component: string | Component
}

export class Toolbar {
  tabBars: TabBar[] = []

  add(tabBar: TabBar) {
    const isHas = this.tabBars.find((item) => item.name === tabBar.name)
    if (isHas) {
      return tabBar
    }
    return this.tabBars.push(tabBar)
  }
  remove(name: string | number) {
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
}
