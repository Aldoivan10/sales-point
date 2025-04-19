<script setup lang="ts" generic="T">
import { QTable, type QTableColumn, type QTableProps } from 'quasar'
import { nextTick, onMounted, ref, watch } from 'vue'

const {
	icon = '',
	rows = [],
	columns = [],
	title = 'Tabla',
	loading = false,
	select = false,
	admin = false,
} = defineProps<{
	rows?: T[]
	title?: string
	loading?: boolean
	columns?: QTableColumn[]
	icon?: string
	select?: boolean
	admin?: boolean
}>()

defineEmits<{
	(e: 'add'): void
	(e: 'edit', product: T): void
	(e: 'remove', products: T[]): void
}>()

const $table = ref<QTable>()
const selected = ref<any[]>([])
const $checks = ref<HTMLInputElement[]>([])
const filter = defineModel('filter', { type: String })
const pagination = defineModel('pagination', {
	type: Object as () => QTableProps['pagination'],
})

function highlightRow(
	step: number,
	row: number = -1,
	{ rowsPerPage: rows = 50, page = 1 }: QTableProps['pagination'] = {},
) {
	const offset = (page - 1) * rows
	const $checkbox = $checks.value[row - offset + step]
	const len = $checks.value.length
	if ($checkbox) $checkbox.focus()
	else $checks.value[step == 1 ? 0 : len - 1].focus()
}

watch(
	() => rows,
	async () => {
		await nextTick()
		$checks.value = Array.from(document.querySelectorAll('.q-checkbox'))
	},
)

onMounted(async () => $table.value?.requestServerInteraction())
</script>

<template>
	<q-table
		:title
		:rows
		:columns
		:loading
		use-input
		ref="$table"
		row-key="id"
		color="primary"
		v-model:selected="selected"
		v-model:pagination="pagination"
		:selection="select ? 'multiple' : 'none'"
		:rows-per-page-options="[10, 50, 100, 250, 500, 0]"
		@request="(props) => (pagination = props.pagination)"
		table-header-class="[&>.text-left]:!text-center [&_th]:!font-bold bg-primary text-white z-10 top-0 sticky"
		class="overflow-auto [&>.q-table\_\_top]:!bg-primary [&>.q-table\_\_top]:!text-white [&_.q-table\_\_bottom]:uppercase"
	>
		<template v-slot:top>
			<div class="flex gap-2 items-center w-full">
				<q-icon :name="icon" size="2em"></q-icon>
				<h6 class="m-0 h-fit w-35">{{ title }}</h6>
				<q-input
					dense
					filled
					color="white"
					debounce="300"
					v-model="filter"
					label-color="white"
					placeholder="BUSCAR..."
					@keydown.down.prevent="highlightRow(1)"
					@keydown.up.prevent="highlightRow(-1)"
					v-shortcut.prevent.click="['ctrl+shift+space']"
					input-class="focus:!text-white !text-orange-200 !uppercase"
					class="[&:focus-within_.q-icon]:text-white grow [&_.q-icon]:text-orange-200 [&_.q-field\_\_control]:before:!border-orange-200"
				>
					<template v-slot:append>
						<q-icon name="r_search" />
					</template>
				</q-input>
				<div class="flex gap-2">
					<slot name="header-append"></slot>
					<span v-if="admin" class="flex gap-2">
						<q-btn
							@click="$emit('add')"
							class="!h-[42px]"
							color="positive"
							round
						>
							<q-icon name="r_add"></q-icon>
							<q-tooltip>NUEVO</q-tooltip>
						</q-btn>
						<q-btn
							@click="$emit('edit', selected[0])"
							class="!h-[42px]"
							color="amber"
							round
						>
							<q-icon name="r_edit"></q-icon>
							<q-tooltip>EDITAR</q-tooltip>
						</q-btn>
						<q-btn
							@click="$emit('remove', selected)"
							class="!h-[42px]"
							color="negative"
							round
						>
							<q-icon name="r_delete"></q-icon>
							<q-tooltip>ELIMINAR</q-tooltip>
						</q-btn>
					</span>
				</div>
			</div>
		</template>
		<template v-slot:header-selection="props">
			<q-checkbox
				class="[&:is([aria-checked=true],[aria-checked=mixed])_svg]:!text-secondary [&:is([aria-checked=true],[aria-checked=mixed])_.q-checkbox\_\_bg]:!bg-white [&:is([aria-checked=true],[aria-checked=mixed])_.q-checkbox\_\_bg]:!border-white"
				@keydown.down.prevent="highlightRow(1, 0)"
				@keydown.up.prevent="highlightRow(-1, 0)"
				v-model="props.selected"
			/>
		</template>
		<template v-slot:body="props">
			<q-tr
				class="[&:has([aria-checked=true])]:!bg-secondary/10 [&:focus-within]:!bg-secondary/5 [&:not(:has([aria-checked=true]))]:odd:bg-gray-100"
				:props="props"
			>
				<q-td v-if="select" auto-width>
					<q-checkbox
						@keydown.down.prevent="
							highlightRow(1, props.rowIndex + 1, pagination)
						"
						@keydown.up.prevent="
							highlightRow(-1, props.rowIndex + 1, pagination)
						"
						v-model="props.selected"
					/>
				</q-td>
				<template v-for="col in columns" :key="col.name">
					<template v-if="$slots[`body-cell-${col.name}`]">
						<slot :name="`body-cell-${col.name}`" v-bind="props" />
					</template>
					<template v-else>
						<q-td :key="col.name" :props="props">
							{{
								typeof col.field == 'function'
									? col.field(props.row)
									: props.row[String(col.field)]
							}}
						</q-td>
					</template>
				</template>
			</q-tr>
		</template>
		<template v-slot:loading>
			<q-inner-loading showing color="primary" />
		</template>
	</q-table>
</template>
