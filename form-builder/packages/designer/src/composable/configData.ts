import { computed, inject, provide } from 'vue'
import { logo } from '@form-builder/assets'
import { merge } from 'lodash'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
export interface Logo {
  src: string
  show: boolean
  title: string
}
export interface ConfigData {
  // 主题色
  theme: string
  // logo
  logo: Logo
}

export const configDefault: ConfigData = {
  theme: '#4A5DFF',
  logo: {
    src: logo,
    show: true,
    title: 'form-builder'
  }
}
export type ConfigDataRef = ComputedRef<ConfigData>

export const configDataSymbol: InjectionKey<ConfigDataRef> =
  Symbol('configData')

export const setupConfigData = (config: Ref<Partial<ConfigData>>): void => {
  const configDataMerge = computed(() => {
    return merge({}, configDefault, config.value)
  })
  provide(configDataSymbol, configDataMerge)
}

export const useConfigData = (): ConfigDataRef => {
  const configData = inject(configDataSymbol)
  if (!configData) {
    throw new Error('useConfigData() is called without provider.')
  }
  return configData
}
