import { isObject } from '@vue/shared'
import { defineStore } from 'pinia'

import defaultSetting from '@/config/setting'
import { SETTING_KEY } from '@/enums/cacheEnums'
import cache from '@/utils/cache'
import { setTheme } from '@/utils/theme'

const storageSetting = cache.get(SETTING_KEY)

export const useSettingStore = defineStore({
    id: 'setting',
    state: () => {
        const state = {
            showDrawer: false,
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
            delete settings.showDrawer
            cache.set(SETTING_KEY, settings)
        },
        // 设置主题色
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
        },
        resetTheme() {
            for (const key in defaultSetting) {
                //@ts-ignore
                this[key] = defaultSetting[key]
            }
            cache.remove(SETTING_KEY)
        }
    }
})

export default useSettingStore
