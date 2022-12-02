/**
 * @description 组册designer实例到vue组件
 */
import { inject, ref } from 'vue'
import type { Designer } from './designer'
import type { App, InjectionKey, Ref } from 'vue'

export type DesignerRef = Ref<Designer>

export const designerSymbol: InjectionKey<DesignerRef> = Symbol('designer')

export const setupDesigner = (designerInstance: Designer, app: App): void => {
  const designer = ref(designerInstance)
  app.provide(designerSymbol, designer)
}

export const useDesigner = (): DesignerRef => {
  const designer = inject(designerSymbol)
  if (!designer) {
    throw new Error('useDesigner() is called without provider.')
  }
  return designer
}
