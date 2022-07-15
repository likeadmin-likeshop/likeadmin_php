import { getConfig } from '@/api/app'
import cache from '@/utils/cache'
import { defineStore } from 'pinia'
import { ECacheKey } from '@/config/enums'
interface ISate {
  config: Record<string, any>
  sidebar: {
    opened: boolean
  }
  isRouteShow: boolean
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): ISate => {
    return {
      config: {},
      sidebar: {
        opened: !!cache.get(ECacheKey.SIDEBAR_STATUS)
      },
      isRouteShow: true
    }
  },
  actions: {
    getConfig() {
      return new Promise((resolve, reject) => {
        getConfig()
          .then((data) => {
            this.config = data
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      if (this.sidebar.opened) {
        cache.set(ECacheKey.SIDEBAR_STATUS, 1)
      } else {
        cache.set(ECacheKey.SIDEBAR_STATUS, 0)
      }
    },
    refreshView() {
      this.isRouteShow = false
      nextTick(() => {
        this.isRouteShow = true
      })
    }
  }
})

export default useAppStore
