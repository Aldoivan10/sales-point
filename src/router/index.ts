import { useTabStore } from '@/stores/tab.store'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach((to, from) => {
	const { user } = useTabStore()
	const { requiresUser = false, requireAdmin = false } = to.meta
	if (requiresUser && !user) return from
	if (requireAdmin && !user?.logged) return from
})

export default router
