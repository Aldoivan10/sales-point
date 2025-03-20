<script setup lang="ts">
import type { QTable, QTableColumn, QTableProps } from 'quasar'
import { onMounted, ref } from 'vue'

const {
    rows = [],
    columns = [],
    title = 'Tabla',
    pagination = {},
} = defineProps<{
    rows?: any[]
    title?: string
    columns?: QTableColumn[]
    pagination?: QTableProps['pagination']
}>()

const filter = ref('')
const $table = ref<QTable>()

onMounted(() => {
    $table.value?.requestServerInteraction()
})
</script>

<template>
    <q-table
        :title
        :rows
        :columns
        ref="$table"
        row-key="id"
        virtual-scroll
        v-model:pagination="pagination"
        table-header-class="bg-primary text-white"
        :rows-per-page-options="[50, 100, 250, 500, 0]"
        @request="(props) => console.log(props.pagination)"
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
                    placeholder="Buscar..."
                    input-class="text-white"
                    class="[&:focus-within_i]:text-white grow"
                >
                    <template v-slot:append>
                        <q-icon name="r_search" />
                    </template>
                </q-input>
            </div>
        </template>
    </q-table>
</template>
