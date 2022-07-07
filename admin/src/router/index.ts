import { createRouter, createWebHistory } from 'vue-router'
import { constRoutes } from './static'

export interface RouteMeta {
    title: string
    icon: string
    hidden: boolean
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...constRoutes]
})

export default router
