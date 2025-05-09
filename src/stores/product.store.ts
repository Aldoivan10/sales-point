import { round, toPercent, toPrice } from '@/utils/format.util'
import { useApiClient } from '@aldoivan10/v-api-client/composable'
import { defineStore } from 'pinia'
import type { QTableColumn } from 'quasar'
import { ref, watch } from 'vue'

export const useProductStore = defineStore('product', () => {
	const api = useApiClient()
	const products = ref<Product.Item[]>([])
	const loading = ref(false)
	const error = ref<APIError>()
	const columns = ref<QTableColumn[]>([])
	enum HIDE_COLS {
		KIT = 'buy, sale, profit, provider, amount',
		SALE = 'sale, profit',
		ADMIN = '',
	}

	const pagination = ref<Table.Pagination & { type: keyof typeof HIDE_COLS }>(
		{
			page: 1,
			rowsNumber: 0,
			rowsPerPage: 50,
			type: 'SALE',
		},
	)
	const search = ref('')

	async function find(params: APIParams) {
		loading.value = true
		error.value = undefined
		const response = await api.get<APIFech<Product.Item>>({
			url: `/product`,
			body: Object.assign({ orders: ['nombre_asc'] }, params),
		})
		if (response.ok) {
			const { items, total } = response.body
			products.value = items
			pagination.value!.rowsNumber = total
			if (items.length) {
				const hideCols = HIDE_COLS[pagination.value.type].split(', ')
				columns.value = buildColumns(items[0]).filter(
					(col) => !hideCols.includes(col.name),
				)
			}
		} else
			error.value = {
				id: response.error.body?.id,
				msg: response.error.message,
			}
		loading.value = false
	}

	function buildColumns(product: Product.Item) {
		const columns: QTableColumn[] = [
			{
				name: 'name',
				align: 'left',
				field: 'name',
				required: true,
				label: 'NOMBRE',
				sortable: false,
			},
		]
		for (const { id, name: label } of product.codes)
			columns.push({
				label,
				align: 'center',
				sortable: false,
				name: `code_${id}`,
				field: (row: Product.Item) =>
					row.codes.find((c) => c.id == id)?.code,
			})
		columns.push({
			name: 'unit',
			label: 'UNIDAD',
			align: 'center',
			sortable: false,
			field: (row: Product.Item) => row.units[0].name,
		})
		columns.push({
			name: 'amount',
			field: (row: Product.Item) => round(row.amount),
			label: 'CANTIDAD',
			align: 'center',
			sortable: false,
		})
		columns.push({
			field: (row: Product.Item) => toPrice(row.buy),
			label: 'PRECIO (MXN)',
			align: 'center',
			sortable: false,
			name: 'buy',
		})
		columns.push({
			align: 'center',
			sortable: false,
			name: 'department',
			label: 'DEPARTAMENTO',
			field: (row: Product.Item) => row.department.name,
		})
		columns.push({
			field: (row: Product.Item) => row.supplier.name,
			label: 'PROVEEDOR',
			name: 'supplier',
			align: 'center',
			sortable: false,
		})
		columns.push({
			field: (row: Product.Item) => toPrice(row.units[0].sale),
			label: 'PRECIO DE COMPRA (MXN)',
			sortable: false,
			align: 'center',
			name: 'sale',
		})
		columns.push({
			field: (row: Product.Item) => toPercent(row.units[0].profit ?? 0),
			label: 'GANANCIA (%)',
			align: 'center',
			sortable: false,
			name: 'profit',
		})
		return columns
	}

	function filter({
		rowsPerPage: limit = 50,
		page = 1,
		search = '',
	}: Table.Options = {}) {
		if (search) {
			let filter
			if (search.includes('*'))
				filter = search
					.toUpperCase()
					.split('*')
					.filter(Boolean)
					.map((str) => `%${str}%`)
					.join('')
			else filter = `${search}%`
			find({
				limit,
				offset: (page - 1) * limit,
				filters: [`nombre_like=${filter}`],
			})
		} else find({ limit, offset: (page - 1) * limit })
	}

	watch([pagination, search], ([pPag, search]) =>
		filter(Object.assign({ search }, pPag)),
	)

	return {
		filter,

		columns,
		products,
		loading,
		pagination,
		search,
		error,
	}
})
