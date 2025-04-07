import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import type { RouteRecordRaw } from 'vue-router'
import { authGuard, needUserGuard } from './guards'
import ClientsView from '@/views/ClientsView.vue'

export const Route: Readonly<Record<string, string>> = {
    HOME: '/',
    SALES_POINT: '/sales-point',
    PRODUCTS: '/products',
    CLIENTS: '/clients',
    CATALOGS: '/catalogs',
    PRINTER: '/printer',
    HISTORY: '/history',
    REPORTS: '/reports',
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
            const { itemsPerPage: limit = '50', search = '', page: offset = '1' } = route.query
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
    {
        path: Route.CLIENTS,
        name: 'clients',
        component: ClientsView,
        beforeEnter: authGuard,
    },
    {
        path: Route.CATALOGS,
        name: 'catalogs',
        component: HomeView,
        beforeEnter: authGuard,
    },
    {
        path: Route.PRINTER,
        name: 'printer',
        component: HomeView,
        beforeEnter: authGuard,
    },
    {
        path: Route.HISTORY,
        name: 'history',
        component: HomeView,
        beforeEnter: authGuard,
    },
    {
        path: Route.REPORTS,
        name: 'reports',
        component: HomeView,
        beforeEnter: authGuard,
    },
]
