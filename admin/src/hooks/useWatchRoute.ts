import type { RouteLocationNormalizedLoaded } from 'vue-router'

export function useWatchRoute(callback: (route: RouteLocationNormalizedLoaded) => void) {
    const route = useRoute()
    watch(
        route,
        () => {
            callback(route)
        },
        {
            immediate: true
        }
    )
    return {
        route
    }
}
