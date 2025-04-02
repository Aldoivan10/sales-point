<script setup lang="ts">
import LoginDialog from '@/components/dialog/LoginDialog.vue'
import { useMenuStore } from '@/stores/menu.store'
import { useTabStore } from '@/stores/tab.store'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const tabStore = useTabStore()
const menuStore = useMenuStore()
const { expandMenu: expand } = storeToRefs(menuStore)
const { user } = storeToRefs(tabStore)

function showLogin() {
    $q.dialog({
        component: LoginDialog,
        componentProps: {
            persistent: true,
            isLogin: true,
        },
    }).onOk(({ username, password }: User.Login) => {
        console.log(username, password)
    })
}
</script>

<template>
    <q-header elevated class="bg-secondary text-white" height-hint="98">
        <q-toolbar>
            <q-btn dense flat round icon="r_menu" @click="expand = !expand" />

            <q-toolbar-title class="flex">
                <q-tabs align="left" class="grow-1" inline-label outside-arrows mobile-arrows>
                    <!-- <q-route-tab to="/page1" label="Page One" /> -->
                </q-tabs>

                <q-btn v-if="!user?.logged" @click="showLogin" dense flat round icon="r_person">
                    <q-tooltip class="text-center">MODO ADMINISTRADOR</q-tooltip>
                </q-btn>
                <q-btn v-else dense flat round icon="r_exit_to_app">
                    <q-tooltip class="text-center">SALIR</q-tooltip>
                </q-btn>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
</template>
