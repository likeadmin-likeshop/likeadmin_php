import type { Skeleton } from 'packages/skeleton/src/skeleton'
import type { Material } from './material'
export class Designer {
  componentsTree: any[]
  componentsMap: Map<any, any>
  material: Material
  skeleton: Skeleton
  selectedId: string | null = null
  constructor() {
    this.componentsTree = []
    this.componentsMap = new Map()
  }
  set() {}
  parseMateToConfig(componentMate: any) {
    console.log(componentMate)
  }
}
