import { computed, inject, provide } from 'vue'
import { logo } from '@form-builder/assets'
import { merge } from 'lodash'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
export interface Logo {
  src: string
  show: boolean
  title: string
}
export interface DesignerConfig {
  // logo
  logo: Logo
}

export const designerConfig: DesignerConfig = {
  logo: {
    src: logo,
    show: true,
    title: 'form-builder'
  }
}
export type DesignerConfigRef = ComputedRef<DesignerConfig>

export const designerConfigSymbol: InjectionKey<DesignerConfigRef> =
  Symbol('designerConfig')

export const setupDesignerConfig = (
  config: Ref<Partial<DesignerConfig>>
): void => {
  const designerConfigMerge = computed(() => {
    return merge({}, designerConfig, config.value)
  })
  provide(designerConfigSymbol, designerConfigMerge)
}

export const useDesignerConfig = (): DesignerConfigRef => {
  const designerConfig = inject(designerConfigSymbol)
  if (!designerConfig) {
    throw new Error('useDesignerConfig() is called without provider.')
  }
  return designerConfig
}
