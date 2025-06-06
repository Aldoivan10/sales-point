import ClientsView from '@/views/ClientsView.vue'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import type { RouteRecordRaw } from 'vue-router'

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
		meta: {
			requiresUser: true,
		},
	},
	{
		path: Route.PRODUCTS,
		name: 'products',
		component: ProductsView,
		props: { admin: true },
		meta: {
			requiresUser: true,
			requireAdmin: true,
		},
	},
	{
		path: Route.CLIENTS,
		name: 'clients',
		component: ClientsView,
		meta: {
			requiresUser: true,
			requireAdmin: true,
		},
	},
	{
		path: Route.CATALOGS,
		name: 'catalogs',
		component: HomeView,
		meta: {
			requiresUser: true,
			requireAdmin: true,
		},
	},
	{
		path: Route.PRINTER,
		name: 'printer',
		component: HomeView,
		meta: {
			requiresUser: true,
			requireAdmin: true,
		},
	},
	{
		path: Route.HISTORY,
		name: 'history',
		component: HomeView,
		meta: {
			requiresUser: true,
			requireAdmin: true,
		},
	},
	{
		path: Route.REPORTS,
		name: 'reports',
		component: HomeView,
		meta: {
			requiresUser: true,
			requireAdmin: true,
		},
	},
]
