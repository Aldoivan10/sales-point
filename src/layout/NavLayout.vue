<script setup lang="ts">
import { useMenuStore } from '@/stores/menu.store'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const menuStore = useMenuStore()
const { expandMenu: mini, menuItems: items } = storeToRefs(menuStore)
</script>

<template>
    <q-drawer :mini show-if-above bordered :width="200" :breakpoint="500">
        <q-list class="text-grey-7" padding>
            <q-item v-for="{ icon, title } of items" clickable v-ripple @click="$q.notify('hola')">
                <q-item-section avatar>
                    <q-icon :name="icon" />
                </q-item-section>

                <q-item-section> {{ title }} </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>
