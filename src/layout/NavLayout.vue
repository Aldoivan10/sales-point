<script setup lang="ts">
import { useMenuStore } from '@/stores/menu.store'
import { useTabStore } from '@/stores/tab.store'
import { storeToRefs } from 'pinia'

const menuStore = useMenuStore()
const tabStore = useTabStore()
const { expandMenu: mini, menuItems: items } = storeToRefs(menuStore)
const { user } = storeToRefs(tabStore)
</script>

<template>
	<q-drawer :mini show-if-above bordered :width="200" :breakpoint="500">
		<q-scroll-area class="fit">
			<q-list class="text-grey-7" padding>
				<template v-for="{ icon, title, route, admin } of items">
					<q-item
						:to="route"
						v-if="!admin || (admin && user?.logged)"
						clickable
						v-ripple
					>
						<q-item-section avatar>
							<q-icon :name="icon" />
						</q-item-section>

						<q-item-section> {{ title }} </q-item-section>
					</q-item>
				</template>
			</q-list>
		</q-scroll-area>
	</q-drawer>
</template>
