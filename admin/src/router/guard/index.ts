import type { Router } from 'vue-router'

const modules = import.meta.glob('./*.ts', { eager: true })

export function registerRouteGuard(router: Router) {
    Object.keys(modules).forEach((key) => {
        const fn = (modules[key] as any).default
        if (typeof fn === 'function') {
            fn(router)
        }
    })
}
