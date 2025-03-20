import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import type { RouteRecordRaw } from 'vue-router'
import { authGuard, needUserGuard } from './guards'

export const Route: Readonly<Record<string, string>> = {
    HOME: '/',
    SALES_POINT: '/sales-point',
    PRODUCTS: '/products',
}

export const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: Route.HOME,
        name: 'home',
        component: HomeView,
    },
    {
        path: Route.SALES_POINT,
        name: 'sales-point',
        component: ProductsView,
        props: (route) => {
            const { itemsPerPage: limit = '10', search = '', page: offset = '1' } = route.query
            return { itemsPerPage: Number(limit), search, page: Number(offset) }
        },
        beforeEnter: needUserGuard,
    },
    {
        path: Route.PRODUCTS,
        name: 'products',
        component: HomeView,
        beforeEnter: authGuard,
    },
]
