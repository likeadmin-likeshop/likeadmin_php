import { defineStore } from 'pinia'
import defaultSetting from '@/config/setting'
import cache from '@/utils/cache'
import { ECacheKey } from '@/config/enums'
import { isObject } from '@vue/shared'
import { setTheme } from '@/utils/theme'
import { useDark } from '@vueuse/core'
const storageSetting = cache.get(ECacheKey.SETTING)

export const useSettingStore = defineStore({
  id: 'setting',
  state: () => {
    const state = {
      show: false,
      ...defaultSetting
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
    },
    setTheme(isDark: boolean) {
      setTheme(
        {
          primary: this.theme,
          success: this.successTheme,
          warning: this.warningTheme,
          danger: this.dangerTheme,
          error: this.errorTheme,
          info: this.infoTheme
        },
        isDark
      )
    }
  }
})

export default useSettingStore
