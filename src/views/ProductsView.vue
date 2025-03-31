<script setup lang="ts">
import TableCmp from '@/components/TableCmp.vue'
import { useProductStore } from '@/stores/product.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const productStore = useProductStore()
const { columns, products: rows, pagination, search: filter } = storeToRefs(productStore)

onMounted(productStore.filter)
</script>

<template>
    <TableCmp
        :rows
        :columns
        title="PRODUCTOS"
        class="grow w-full"
        v-model:filter="filter"
        v-model:pagination="pagination"
    />
</template>
