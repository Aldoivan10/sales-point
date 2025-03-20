<script setup lang="ts">
import { useQuasar } from 'quasar'
import HeaderLayout from './layout/HeaderLayout.vue'
import NavLayout from './layout/NavLayout.vue'
import ChoiceUserDialog from './components/dialog/ChoiceUserDialog.vue'
import { useTabStore } from './stores/tab.store'

const $q = useQuasar()
const tabStore = useTabStore()

$q.dialog({
    component: ChoiceUserDialog,
    componentProps: {
        persistent: true,
    },
}).onOk((user: User.State) => {
    tabStore.addTab(user)
    $q.notify({
        type: 'positive',
        message: `ACCEDIDO COMO: <b>${user.name}</b>`,
        html: true,
    })
})
</script>

<template>
    <q-layout view="hhh lpR lFr">
        <HeaderLayout />
        <NavLayout />

        <q-page-container class="h-dvh">
            <main class="h-full p-4 place-items-center !flex flex-col justify-center items-center">
                <router-view />
            </main>
        </q-page-container>
    </q-layout>
</template>
