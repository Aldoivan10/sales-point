<script setup lang="ts">
import type { QTable, QTableColumn, QTableProps } from 'quasar'
import { onMounted, ref } from 'vue'

const {
    rows = [],
    columns = [],
    title = 'Tabla',
    loading = false,
} = defineProps<{
    rows?: any[]
    title?: string
    loading?: boolean
    columns?: QTableColumn[]
}>()

const $table = ref<QTable>()
const filter = defineModel('filter', { type: String })
const pagination = defineModel('pagination', { type: Object as () => QTableProps['pagination'] })

onMounted(() => $table.value?.requestServerInteraction())
</script>

<template>
    <q-table
        :title
        :rows
        :columns
        :loading
        ref="$table"
        row-key="id"
        virtual-scroll
        color="primary"
        v-model:pagination="pagination"
        :rows-per-page-options="[50, 100, 250, 500, 0]"
        table-header-class="[&>.text-left]:!text-center"
        @request="(props) => (pagination = props.pagination)"
        class="overflow-auto [&_thead]:sticky [&_thead]:z-10 [&_thead]:top-0 [&_tbody_tr]:odd:!bg-gray-100 [&_thead]:!bg-primary [&_thead]:!text-white [&_thead_th]:!font-bold [&>.q-table\_\_top]:!bg-primary [&>.q-table\_\_top]:!text-white [&_.q-table\_\_bottom]:uppercase"
    >
        <template v-slot:top>
            <div class="flex gap-2 items-center w-full">
                <q-icon name="r_all_inbox" size="2em"></q-icon>
                <h6 class="m-0 h-fit">{{ title }}</h6>
                <q-input
                    dense
                    filled
                    color="white"
                    debounce="300"
                    v-model="filter"
                    label-color="white"
                    placeholder="BUSCAR..."
                    input-class="focus:!text-white !text-orange-200 !uppercase"
                    class="[&:focus-within_.q-icon]:text-white grow [&_.q-icon]:text-orange-200 [&_.q-field\_\_control]:before:!border-orange-200"
                >
                    <template v-slot:append>
                        <q-icon name="r_search" />
                    </template>
                </q-input>
            </div>
        </template>
        <template v-slot:loading>
            <q-inner-loading showing color="primary" />
        </template>
    </q-table>
</template>
