import { inject, provide, ref } from 'vue'
import { Designer } from '../designer'
import type { InjectionKey, Ref } from 'vue'

export type DesignerRef = Ref<Designer>

export const designerSymbol: InjectionKey<DesignerRef> = Symbol('designer')

export const setupDesigner = (): void => {
  const designer = ref(new Designer())
  provide(designerSymbol, designer)
}

export const useDesigner = (): DesignerRef => {
  const designer = inject(designerSymbol)
  if (!designer) {
    throw new Error('useDesigner() is called without provider.')
  }
  return designer
}
