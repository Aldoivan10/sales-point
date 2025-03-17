import { useTabStore } from '@/stores/tab.store'
import type { RouteLocationNormalized } from 'vue-router'

export function authGuard(_: RouteLocationNormalized, from: RouteLocationNormalized) {
    const { user } = useTabStore()
    if (!user || !user.logged) return from
}

export function needUserGuard(_: RouteLocationNormalized, from: RouteLocationNormalized) {
    const { user } = useTabStore()
    if (!user) return from
}
