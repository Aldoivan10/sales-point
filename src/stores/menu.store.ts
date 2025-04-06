import { Route } from '@/router/routes'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu-store', () => {
    const menuItems = ref<Menu.Item[]>([
        {
            title: 'PUNTO DE VENTA',
            admin: false,
            subtitle: 'F1',
            icon: 'r_store',
            tooltip: 'F1',
            route: Route.SALES_POINT,
        },
        {
            title: 'CLIENTES',
            admin: true,
            subtitle: 'F2',
            icon: 'r_people_alt',
            tooltip: 'F2',
            route: Route.CLIENTS,
        },
        {
            title: 'CATÁLOGOS',
            admin: true,
            subtitle: 'F3',
            icon: 'r_menu_book',
            tooltip: 'F3',
            route: Route.CATALOGS,
        },
        {
            title: 'IMPRESORA',
            admin: true,
            subtitle: 'F4',
            icon: 'r_print',
            tooltip: 'F4',
            route: Route.PRINTER,
        },
        {
            title: 'HISTORIAL',
            admin: true,
            subtitle: 'F5',
            icon: 'r_history',
            tooltip: 'F5',
            route: Route.HISTORY,
        },
        {
            title: 'REPORTES',
            admin: true,
            subtitle: 'F6',
            icon: 'r_library_books',
            tooltip: 'F6',
            route: Route.REPORTS,
        },
    ])
    const expandMenu = ref(false)
    const currentRoute = ref(Route.HOME)

    return { menuItems, expandMenu, currentRoute }
})
