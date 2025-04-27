import { useApiClient } from '@aldoivan10/v-api-client/composable'
import { defineStore } from 'pinia'
import type { QTableColumn } from 'quasar'
import { ref, watch } from 'vue'

export const useKitStore = defineStore('kit', () => {
	const api = useApiClient()
	const loading = ref(false)
	const kits = ref<Kit.Item[]>()
	const columns = ref<QTableColumn[]>([
		{
			name: 'name',
			field: 'anme',
			required: true,
			label: 'NOMBRE',
			sortable: false,
		},
		{
			name: 'name',
			align: 'left',
			field: 'name',
			required: true,
			label: 'NOMBRE',
			sortable: false,
		},
		{
			name: 'type',
			align: 'center',
			required: true,
			label: 'TIPO',
			sortable: false,
			field: (row: Entity.Item) => row.type.name,
		},
		{
			name: 'address',
			align: 'center',
			field: 'address',
			required: true,
			label: 'DIRECCIÓN',
			sortable: false,
		},
		{
			name: 'domicile',
			align: 'center',
			field: 'domicile',
			required: true,
			label: 'DOMICILIO',
			sortable: false,
		},
		{
			name: 'postal_code',
			align: 'center',
			field: 'postal_code',
			required: true,
			label: 'CÓDIGO POSTAL',
			sortable: false,
		},
		{
			name: 'phone',
			align: 'center',
			field: 'phone',
			required: true,
			label: 'TELÉFONO',
			sortable: false,
		},
		{
			name: 'email',
			align: 'center',
			field: 'email',
			required: true,
			label: 'CORREO',
			sortable: false,
		},
	])
	const pagination = ref<Table.Pagination>({
		page: 1,
		rowsNumber: 0,
		rowsPerPage: 50,
	})
	const error = ref<APIError>()
	const entityType = ref('')
	const search = ref('')

	async function find(params: APIParams) {
		loading.value = true
		error.value = undefined
		const response = await api.get<APIFech<Kit.Item>>({
			url: `/entity`,
			body: Object.assign({ orders: ['nombre_asc'] }, params),
		})
		if (response.ok) {
			const { items, total } = response.body
			kits.value = items
			pagination.value!.rowsNumber = total
		} else
			error.value = {
				id: response.error.body?.id,
				msg: response.error.message,
			}
		loading.value = false
	}

	function filter({
		rowsPerPage: limit = 10,
		page = 1,
		search = '',
		type,
	}: Table.Entity = {}) {
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
				filters: [`nombre_like=${filter}`, type],
			})
		} else find({ limit, offset: (page - 1) * limit, filters: [type] })
	}

	watch([pagination, search, entityType], ([pPag, search, strType]) => {
		const type = strType ? `id_tipo_eq=${Number(strType)}` : ''
		filter(Object.assign({ search, type }, pPag))
	})

	return {
		error,
		loading,
		pagination,
		columns,
		kits,
		search,
		entityType,
		filter,
	}
})
