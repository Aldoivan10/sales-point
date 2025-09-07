<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalog.store'
import { storeToRefs } from 'pinia'

const catalogStore = useCatalogStore()
const { units, codes } = storeToRefs(catalogStore)

const product: Partial<Product.Item> = {}

catalogStore.find('units')
catalogStore.find('codes')
console.log(codes)
</script>

<template>
	<q-page
		class="h-full p-4 place-items-center !flex flex-col justify-center items-center position-relative"
	>
		<q-card class="w-full h-full">
			<q-card-section class="bg-primary text-white">
				<div class="text-h6">AGREGAR PRODUCTO</div>
			</q-card-section>
			<q-card-section class="grid grid-cols-4 gap-2">
				<q-input
					v-for="{ name: label } in codes.items"
					v-model="product.name"
					filled
					:label
				/>
				<q-input v-model="product.name" filled label="NOMBRE" />
				<q-select
					filled
					label="UNIDAD"
					option-value="id"
					option-label="name"
					:options="units.items"
					v-model="product.units"
					:loading="units.loading"
					multiple
				/>
				<q-select
					filled
					label="PROVEEDOR"
					option-value="id"
					option-label="name"
					:options="units.items"
					v-model="product.units"
					:loading="units.loading"
					multiple
				/>
				<q-select
					filled
					label="DEPARTAMENTO"
					option-value="id"
					option-label="name"
					:options="units.items"
					v-model="product.units"
					:loading="units.loading"
					multiple
				/>
				<q-input
					v-model.number="product.amount"
					label="CANTIDAD"
					type="number"
					filled
				/>
				<q-input
					v-model.number="product.min"
					label="MÍNINO"
					type="number"
					filled
				/>
				<q-input
					v-model.number="product.min"
					label="PRECIO DE COMPRA"
					type="number"
					filled
				/>
				<q-input
					v-model.number="product.min"
					label="PRECIO DE VENTA"
					type="number"
					filled
				/>
				<q-input
					v-model.number="product.min"
					label="GANANCIA"
					type="number"
					filled
				/>
				<q-checkbox v-model="product.refundable" label="REEMBOLSABLE" />
			</q-card-section>
		</q-card>
	</q-page>
</template>
