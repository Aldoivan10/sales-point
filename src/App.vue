<script setup lang="ts">
import { useQuasar } from 'quasar'
import HeaderLayout from './layout/HeaderLayout.vue'
import NavLayout from './layout/NavLayout.vue'
import ChoiceUserDialog from './components/dialog/ChoiceUserDialog.vue'
import { useTabStore } from './stores/tab.store'
import { onMounted } from 'vue'

const $q = useQuasar()
const tabStore = useTabStore()

$q.dialog({
    component: ChoiceUserDialog,
    componentProps: {
        persistent: true,
    },
}).onOk((user: User.State) => {
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
            <router-view />
        </q-page-container>
    </q-layout>
</template>
