<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalog.store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const catalogStore = useCatalogStore()
const { units, codes, providers, departments } = storeToRefs(catalogStore)

const product = ref<Product.Form>(
	Object.assign(
		{ codes: {}, units: [{ profit: 50 }], refundable: false },
		undefined,
	),
)

function addUnit() {
	const units = product.value.units
	units.push({})
}

onMounted(async () => {
	await catalogStore.find('units')
	await catalogStore.find('codes')
	await catalogStore.find('providers', {
		orders: ['id_asc'],
		filters: ['id_tipo=1'],
	})
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
			<q-btn
				class="align-self-end justify-self-end"
				color="positive"
				label="GUARDAR"
				icon="r_save"
			/>
		</div>
		<q-card class="w-full h-full">
			<q-card-section>
				<q-form
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
				>
					<h5
						class="col-span-full text-secondary font-bold flex align-center gap-3 border-b-1 pb-1 mb-2"
					>
						<q-icon name="r_assessment" size="md"></q-icon>
						DATOS GENERALES
					</h5>
					<q-input
						v-for="{ name: label, id } in codes.items"
						v-model="product.codes[id]"
						maxlength="32"
						counter
						filled
						:label
					>
						<template v-slot:prepend>
							<q-icon name="r_key" />
						</template>
					</q-input>
					<q-input
						filled
						counter
						label="NOMBRE"
						maxlength="512"
						v-model="product.name"
					>
						<template v-slot:prepend>
							<q-icon name="r_style" />
						</template>
					</q-input>
					<q-select
						filled
						label="PROVEEDOR"
						option-value="id"
						option-label="name"
						v-model="product.supplier"
						:options="providers.items"
						:loading="providers.loading"
					>
						<template v-slot:prepend>
							<q-icon name="r_departure_board" />
						</template>
					</q-select>
					<q-select
						filled
						option-value="id"
						option-label="name"
						label="DEPARTAMENTO"
						v-model="product.department"
						:options="departments.items"
						:loading="departments.loading"
					>
						<template v-slot:prepend>
							<q-icon name="r_domain" />
						</template>
					</q-select>
					<q-select
						label="UNIDAD"
						option-value="id"
						option-label="name"
						:options="units.items"
						v-model="product.units[0].id"
						:loading="units.loading"
						filled
					>
						<template v-slot:prepend>
							<q-icon name="r_category" />
						</template>
					</q-select>
					<q-input
						v-model.number="product.amount"
						label="CANTIDAD"
						type="number"
						step="0.5"
						min="0"
						filled
					>
						<template v-slot:prepend>
							<q-icon name="r_dashboard_customize" />
						</template>
					</q-input>
					<q-input
						v-model.number="product.min"
						label="MÍNINO"
						type="number"
						step="0.5"
						min="0"
						filled
					>
						<template v-slot:prepend>
							<q-icon name="r_circle_notifications" />
						</template>
					</q-input>
					<q-input
						v-model.number="product.buy"
						label="PRECIO DE COMPRA"
						type="number"
						suffix="MXN"
						min="0"
						filled
					>
						<template v-slot:prepend>
							<q-icon name="r_attach_money" />
						</template>
					</q-input>
					<q-input
						v-model.number="product.units[0].sale"
						label="PRECIO DE VENTA"
						type="number"
						suffix="MXN"
						min="0"
						filled
					>
						<template v-slot:prepend>
							<q-icon name="r_attach_money" />
						</template>
					</q-input>
					<q-input
						v-model.number="product.units[0].profit"
						label="GANANCIA"
						type="number"
						max="100"
						min="0"
						filled
					>
						<template v-slot:prepend>
							<q-icon name="r_percent" />
						</template>
					</q-input>
					<q-checkbox
						v-model="product.refundable"
						label="REEMBOLSABLE"
						class="h-[56px]"
					/>
					<h5
						class="col-span-full text-secondary font-bold flex items-center gap-3 border-b-1 pb-1 my-2"
					>
						<q-icon name="r_auto_awesome_mosaic" size="md"></q-icon>
						UNIDADES
						<q-btn
							round
							outline
							size="sm"
							icon="r_add"
							color="secondary"
							@click="addUnit"
						>
							<q-tooltip> AGREGAR </q-tooltip>
						</q-btn>
					</h5>

					<div
						class="grid grid-cols-subgrid md:grid-cols-2 col-span-full gap-8 pr-3"
					>
						<div
							class="grid grid-cols-2 gap-4 p-2 bg-gray-100 rounded relative"
							v-for="key in product.units.length - 1"
							:key
						>
							<q-select
								outlined
								label="UNIDAD"
								option-value="id"
								option-label="name"
								:options="units.items"
								:loading="units.loading"
								v-model="product.units[key].id"
							>
								<template v-slot:prepend>
									<q-icon name="r_category" />
								</template>
							</q-select>
							<q-input
								v-model.number="product.units[key].sale"
								label="PRECIO DE VENTA"
								type="number"
								suffix="MXN"
								outlined
							>
								<template v-slot:prepend>
									<q-icon name="r_attach_money" />
								</template>
							</q-input>
							<q-btn
								round
								size="sm"
								icon="r_delete"
								color="negative"
								class="absolute end-[-1.5em] top-[-1em] z-2"
							>
								<q-tooltip> Eliminar </q-tooltip>
							</q-btn>
						</div>
					</div>
				</q-form>
			</q-card-section>
		</q-card>
	</q-page>
</template>
