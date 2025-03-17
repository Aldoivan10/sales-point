import { Route } from '@/router/routes'
import { LinkedArray } from '@aldoivan10/linked-array'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export const useTabStore = defineStore('tab', () => {
    const tabs = ref(new LinkedArray<Required<User.State>>())
    const user = computed(() => tabs.value.current())
    const router = useRouter()

    watch(tabs.value, (oldArr, newArr) => {
        if (oldArr.length > newArr.length) tabs.value.previous()
        else tabs.value.next()
    })

    watch(user, (tab) => {
        if(tab) changeView(tab)
    })

    function addTab(user: User.State) {
        const tab = Object.assign(
            {
                route: Route.SALES_POINT,
                itemsPerPage: 10,
                search: '',
                page: 1,
            },
            user,
        )
        tabs.value.push(tab)
    }

    function changeView(tab: Required<User.State>) {
        const { route, itemsPerPage, search, page } = tab
        router.push({ path: route, query: { itemsPerPage, search, page } })
    }

    return { tabs, user, addTab }
})
