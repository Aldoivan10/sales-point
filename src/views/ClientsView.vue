<script setup lang="ts">
import TableCmp from '@/components/TableCmp.vue'
import { useClientStore } from '@/stores/client.store'
import { errorToast } from '@/utils/msg.util'
import { storeToRefs } from 'pinia'
import { useQuasar, type QSelectOption } from 'quasar'
import { ref, watch } from 'vue'

const $q = useQuasar()
const clientStore = useClientStore()
const {
	search: filter,
	clients: rows,
	entityType: type,
	pagination,
	columns,
	loading,
	error,
} = storeToRefs(clientStore)

const options = ref<QSelectOption[]>([
	{ label: 'TODOS', value: '' },
	{ label: 'PROVEEDORES', value: '1' },
	{ label: 'CLIENTES', value: '2' },
])

watch(error, (newErrror) => {
	if (newErrror) errorToast($q, newErrror.msg, newErrror.id)
})
</script>

<template>
	<TableCmp
		:rows
		:columns
		:loading
		:select="true"
		icon="r_groups"
		title="CLIENTES"
		class="grow w-full"
		v-model:filter="filter"
		v-model:pagination="pagination"
	>
		<template #header-append>
			<q-select
				dense
				filled
				emit-value
				map-options
				label="TIPO"
				color="secondary"
				v-model="type"
				:options="options"
				class="[&_.q-icon]:text-white [&_.ellipsis]:!text-white [&:focus-within_.q-field\_\_control]:after:!bg-white [&_.q-field\_\_control]:before:!border-orange-200 w-45"
			/>
		</template>
		<template v-slot:body-cell-email="props">
			<q-td key="email" :props="props">
				<a
					v-if="props.row.email"
					:href="'mailto:' + props.row.email"
					class="text-blue"
				>
					{{ props.row.email }}
				</a>
			</q-td>
		</template>
		<template v-slot:body-cell-phone="props">
			<q-td key="phone" :props="props">
				<a
					v-if="props.row.phone"
					:href="'tel:' + props.row.phone"
					class="text-blue"
				>
					{{ props.row.phone }}
				</a>
			</q-td>
		</template>
	</TableCmp>
</template>
