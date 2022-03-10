import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

export function useAdmin() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    return {
        store,
        route,
        router
    }
}
