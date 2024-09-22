import useUserStore from '@/stores/modules/user'

export const hasPermission = (perms: string[]): boolean => {
    const userStore = useUserStore()
    const permissions = userStore.perms
    const all_permission = '*'
    if (perms.length > 0) {
        let hasPermission = true
        perms.forEach((key: string) => {
            if (!permissions.includes(key) && !permissions.includes(all_permission)) {
                hasPermission = false
            }
        })
        return hasPermission
    } else {
        return true
    }
}
