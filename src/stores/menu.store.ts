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
    ])
    const expandMenu = ref(false)
    const currentRoute = ref(Route.HOME)

    return { menuItems, expandMenu, currentRoute }
})
