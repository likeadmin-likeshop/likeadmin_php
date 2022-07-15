import { defineStore } from 'pinia'
import defaultConfig from '@/config'
import cache from '@/utils/cache'
import { ECacheKey } from '@/config/enums'
import { isObject } from '@vue/shared'
const { title, theme, sideTheme, sideDarkColor } = defaultConfig
const storageSetting = cache.get(ECacheKey.SETTING)
interface ISate {
  show: boolean
  title: string
  theme: string
  sideTheme: string
  sideDarkColor: string
}

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): ISate => {
    const state = {
      show: false,
      title,
      theme,
      sideTheme,
      sideDarkColor
    }
    isObject(storageSetting) && Object.assign(state, storageSetting)
    return state
  },
  actions: {
    // 设置布局设置
    setSetting(data: Record<string, any>) {
      const { key, value } = data
      if (this.hasOwnProperty(key)) {
        //@ts-ignore
        this[key] = value
      }
      const settings: any = Object.assign({}, this.$state)
      delete settings.show
      cache.set(ECacheKey.SETTING, settings)
    }
  }
})

export default useSettingStore
