<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalog.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const catalogStore = useCatalogStore()
const { units, codes, providers, departments } = storeToRefs(catalogStore)

const product = ref<Product.Form>(
	Object.assign({ codes: {}, refundable: false }, undefined),
)

onMounted(async () => {
	await catalogStore.find('units')
	await catalogStore.find('codes')
	await catalogStore.find('providers')
	await catalogStore.find('departments')
	if (!Object.keys(product.value.codes).length) {
		product.value.codes = codes.value.items.reduce(
			(acc, { id }) => {
				acc[id] = ''
				return acc
			},
			{} as Record<number, string>,
		)
	}
})
</script>

<template>
	<q-page
		class="h-full p-4 place-items-center !flex flex-col justify-center items-center position-relative"
	>
		<div class="mb-4 w-full flex gap-4">
			<q-btn flat round color="secondary" icon="r_arrow_back">
				<q-tooltip> REGRESAR </q-tooltip>
			</q-btn>
			<h4 class="text-secondary text-start font-bold">
				Crear nuevo producto
			</h4>
		</div>
		<q-card class="w-full h-full">
			<q-card-section class="grid grid-cols-4 gap-2">
				<h5
					class="col-span-full text-secondary font-bold flex align-center gap-3 border-b-1 pb-1 mb-2"
				>
					<q-icon name="r_assessment" size="md"></q-icon>
					DATOS GENERALES
				</h5>
				<q-input
					v-for="{ name: label, id } in codes.items"
					v-model="product.codes[id]"
					:label
					filled
				/>
				<q-input filled label="NOMBRE" v-model="product.name" />
				<q-select
					filled
					label="PROVEEDOR"
					option-value="id"
					option-label="name"
					v-model="product.supplier"
					:options="providers.items"
					:loading="providers.loading"
				/>
				<q-select
					filled
					option-value="id"
					option-label="name"
					label="DEPARTAMENTO"
					v-model="product.department"
					:options="departments.items"
					:loading="departments.loading"
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
					v-model.number="product.buy"
					label="PRECIO DE COMPRA"
					type="number"
					filled
				/>
				<q-checkbox v-model="product.refundable" label="REEMBOLSABLE" />
				<h5
					class="col-span-full text-secondary font-bold flex align-center gap-3 border-b-1 pb-1 my-2"
				>
					<q-icon name="r_auto_awesome_mosaic" size="md"></q-icon>
					UNIDADES
				</h5>

				<div
					class="col-span-2 grid grid-cols-3 gap-4 p-2 bg-gray-100 rounded"
				>
					<q-select
						label="UNIDAD"
						option-value="id"
						option-label="name"
						:options="units.items"
						v-model="product.units"
						:loading="units.loading"
						outlined
					/>
					<q-input
						v-model.number="product.buy"
						label="PRECIO DE VENTA"
						type="number"
						outlined
					/>
					<q-input
						v-model.number="product.buy"
						label="GANANCIA"
						type="number"
						outlined
					/>
				</div>
			</q-card-section>
		</q-card>
	</q-page>
</template>
