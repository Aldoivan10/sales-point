import { useApiClient } from "@aldoivan10/v-api-client/composable";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCatalogStore = defineStore('catlog', () => {
    const api = useApiClient()
    const catalogs = {
        'units': ref<CatalogItem>({
            total: 0,
            items: [],
            loading: false,
            error: undefined,
            endPoint: '/unit'
        }),
        'codes': ref<CatalogItem>({
            total: 0,
            items: [],
            loading: false,
            error: undefined,
            endPoint: '/code'
        })
    }
    const units = catalogs['units']
    const codes = catalogs['codes']

    async function find(name: keyof typeof catalogs, options: Record<string, any> = { orders: ['id_asc'] }) {
        const catalog = catalogs[name]
        catalog.value.loading = true
        catalog.value.error = undefined
        const response = await api.get<APIFech<Product.Catalog>>({
            url: catalog.value.endPoint,
            body: options,
        })
        if (response.ok) {
            const { items, total } = response.body
            catalog.value.items = items
            catalog.value.total = total
        } else
            catalog.value.error = {
                id: response.error.body?.id,
                msg: response.error.message,
            }
        catalog.value.loading = false
    }

    return { find, units, codes }
})