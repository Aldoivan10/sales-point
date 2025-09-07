<script setup lang="ts">
import TableCmp from '@/components/TableCmp.vue'
import { useKitStore } from '@/stores/kit.store'
import { useProductStore } from '@/stores/product.store'
import { errorToast } from '@/utils/msg.util'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { computed, ref, watch } from 'vue'
const { admin = false } = defineProps<{ admin?: boolean }>()

const productStore = useProductStore()
const kitsStore = useKitStore()
const {
	kits,
	columns: kitColumns,
	pagination: kitPagination,
	search: kitSearch,
	loading: kitLoading,
	error: kitError,
} = storeToRefs(kitsStore)
const {
	products,
	columns: productsColumns,
	pagination: productPagination,
	search: productSearch,
	loading: productLoading,
	error: productError,
} = storeToRefs(productStore)
const $q = useQuasar()
const showKits = ref(false)

const data = computed<ProductTableData>((prev) => {
	return {
		columns: showKits.value ? kitColumns.value : productsColumns.value,
		loading: showKits.value ? kitLoading.value : productLoading.value,
		rows: showKits.value ? kits.value : products.value,
		tooltip: showKits.value ? 'PRODUCTOS' : 'KITS',
		title: showKits.value ? 'KITS' : 'PRODUCTOS',
	}
})
const filter = computed({
	get() {
		return showKits.value ? kitSearch.value : productSearch.value
	},
	set(newValue) {
		const search = showKits.value ? kitSearch : productSearch
		search.value = newValue
	},
})
const pagination = computed({
	get() {
		return showKits.value ? kitPagination.value : productPagination.value
	},
	set(newValue) {
		const pag = showKits.value ? kitPagination : productPagination
		pag.value = newValue
	},
})

watch([productError, kitError], ([pError, kError]) => {
	const error = pError || kError
	if (error) errorToast($q, error.msg, error.id)
})
</script>

<template>
	<q-page
		class="h-full p-4 place-items-center !flex flex-col justify-center items-center position-relative"
	>
		<TableCmp
			select
			:admin
			:key="data.title"
			:rows="data.rows"
			:title="data.title"
			class="grow w-full"
			icon="r_point_of_sale"
			:columns="data.columns"
			:loading="data.loading"
			v-model:filter="filter"
			v-model:pagination="pagination"
			@edit="(item) => console.log(item)"
			@add="$router.push({ name: 'add-product' })"
		>
			<template #header-append>
				<q-toggle
					:color="admin ? 'primary' : 'dark'"
					unchecked-icon="r_inventory_2"
					checked-icon="r_all_inbox"
					v-model="showKits"
					size="lg"
				>
					<q-tooltip class="text-center">
						{{ data.tooltip }}
					</q-tooltip>
				</q-toggle>
			</template>
		</TableCmp>
	</q-page>
</template>
