<script setup lang="ts">
import { useQuasar } from 'quasar'
import ChoiceUserDialog from './components/dialog/ChoiceUserDialog.vue'
import HeaderLayout from './layout/HeaderLayout.vue'
import NavLayout from './layout/NavLayout.vue'
import { useTabStore } from './stores/tab.store'
import { okToast } from './utils/msg.util'

const $q = useQuasar()
const tabStore = useTabStore()

$q.dialog({
	component: ChoiceUserDialog,
	componentProps: {
		persistent: true,
	},
}).onOk((user: User.State) => {
	tabStore.addTab(user)
	okToast($q, `ACCEDIDO COMO <i><b>${user.name}</b></i>`)
})
</script>

<template>
	<q-layout
		view="hhh lpR lFr"
		class="selection:text-white selection:bg-secondary [&_.q-drawer]:transition-[width] [&:has(.q-drawer--mini)_.q-list]:w-[50px]"
	>
		<HeaderLayout />
		<NavLayout />

		<q-page-container class="h-dvh transition-[padding-left]">
			<router-view />
		</q-page-container>
	</q-layout>
</template>
