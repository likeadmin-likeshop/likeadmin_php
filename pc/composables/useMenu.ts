import { NAVBAR, SIDEBAR } from '@/constants/menu'
export default function useMenu() {
    const menu = useState(() => NAVBAR)
    const route = useRoute()
    const sidebar = computed(() => getSidebar(route.meta.module))
    const hasSidebar = computed(() => sidebar.value.length)
    return {
        menu,
        sidebar,
        hasSidebar
    }
}

function getSidebar(module?: string): any[] {
    const queue: any[] = []
    SIDEBAR.forEach((item) => queue.push(item))
    while (queue.length) {
        const item = queue.shift()
        if (item.module && item.module == module) {
            return item.children
        }
        item.children &&
            item.children.forEach((child: any) => queue.push(child))
    }
    return []
}
