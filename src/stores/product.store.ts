import { round, toPercent, toPrice } from '@/utils/format.util'
import { useApi } from '@aldoivan10/v-api-client/composable'
import { defineStore } from 'pinia'
import type { QTableColumn, QTableProps } from 'quasar'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
    const api = useApi()
    const products = ref<Product.Item[]>([])
    const loading = ref(false)
    const columns = ref<QTableColumn[]>([])

    const pagination = ref<QTableProps['pagination']>({
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
    })

    async function find(params: APIParams) {
        loading.value = true
        const queryParams = new URLSearchParams(Object.assign({ orders: ['nombre_asc'] }, params))
        const response = await api.get<APIFech<Product.Item>>({
            url: `/product?${queryParams.toString()}`,
        })
        if (response.ok) {
            const { items, total } = response.body
            products.value = items
            pagination.value!.rowsNumber = total
            columns.value = buildColumns(items[0])
            console.log(items)
        } else console.log(response.error)
        loading.value = false
    }

    function buildColumns(product: Product.Item) {
        const columns: QTableColumn[] = [
            {
                name: 'name',
                field: 'name',
                required: true,
                label: 'Nombre',
                align: 'center',
                sortable: false,
            },
        ]
        for (const { id, name: label } of product.codes)
            columns.push({
                label,
                align: 'center',
                sortable: false,
                name: `code_${id}`,
                field: (row: Product.Item) => row.codes.find((c) => c.id == id)?.code,
            })
        columns.push({
            name: 'unit',
            label: 'Unidad',
            align: 'center',
            sortable: false,
            field: (row: Product.Item) => row.units[0].name,
        })
        columns.push({
            name: 'amount',
            field: (row: Product.Item) => round(row.amount),
            label: 'Cantidad',
            align: 'center',
            sortable: false,
        })
        columns.push({
            field: (row: Product.Item) => toPrice(row.buy),
            label: 'Precio (MXN)',
            align: 'center',
            sortable: false,
            name: 'buy',
        })
        columns.push({
            align: 'center',
            sortable: false,
            name: 'department',
            label: 'Departamento',
            field: (row: Product.Item) => row.department.name,
        })
        columns.push({
            field: (row: Product.Item) => row.supplier.name,
            label: 'Proveedor',
            name: 'supplier',
            align: 'center',
            sortable: false,
        })
        columns.push({
            field: (row: Product.Item) => toPrice(row.units[0].sale),
            label: 'Precio de compra (MXN)',
            sortable: false,
            align: 'center',
            name: 'sale',
        })
        columns.push({
            field: (row: Product.Item) => toPercent(row.units[0].profit ?? 0),
            label: 'Ganancia (%)',
            align: 'center',
            sortable: false,
            name: 'profit',
        })
        return columns
    }

    function filter({ itemsPerPage: limit = 10, page = 1, search = '' }: Table.Options = {}) {
        if (search) {
            let filter
            if (search.includes('*'))
                filter = search
                    .split('*')
                    .filter(Boolean)
                    .map((str) => `%${str}%`)
                    .join('')
            else filter = `${search}%`
            find({ limit, offset: (page - 1) * limit, filters: [`nombre_like=${filter}`] })
        } else find({ limit, offset: (page - 1) * limit })
    }

    return { filter, columns, products, loading, pagination }
})
