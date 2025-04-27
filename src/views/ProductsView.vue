<script setup lang="ts">
import TableCmp from '@/components/TableCmp.vue'
import { useProductStore } from '@/stores/product.store'
import { errorToast } from '@/utils/msg.util'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { computed, ref, watch } from 'vue'

const { admin = false } = defineProps<{ admin?: boolean }>()

const productStore = useProductStore()
const {
	columns,
	products: rows,
	pagination,
	search: filter,
	loading,
	error,
} = storeToRefs(productStore)
const $q = useQuasar()
const showKits = ref(false)
const tooltip = computed(() => (showKits.value ? 'PRODUCTOS' : 'KITS'))
const title = computed(() => (showKits.value ? 'KITS' : 'PRODUCTOS'))

watch(error, (newErrror) => {
	if (newErrror) errorToast($q, newErrror.msg, newErrror.id)
})
</script>

<template>
	<TableCmp
		:rows
		:title
		:columns
		:loading
		:admin
		select
		class="grow w-full"
		icon="r_point_of_sale"
		v-model:filter="filter"
		v-model:pagination="pagination"
		@edit="(item) => console.log(item)"
	>
		<template #header-append>
			<q-toggle
				unchecked-icon="r_inventory_2"
				checked-icon="r_all_inbox"
				v-model="showKits"
				color="black"
				size="lg"
			>
				<q-tooltip class="text-center">
					{{ tooltip }}
				</q-tooltip>
			</q-toggle>
		</template>
	</TableCmp>
</template>
