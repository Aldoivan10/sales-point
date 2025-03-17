<script setup lang="ts">
import { useMenuStore } from '@/stores/menu.store'
import { storeToRefs } from 'pinia'

const menuStore = useMenuStore()
const { expandMenu: expand } = storeToRefs(menuStore)
</script>

<template>
    <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
            <q-btn dense flat round icon="r_menu" @click="expand = !expand" />

            <q-toolbar-title>
                <q-tabs align="left" inline-label outside-arrows mobile-arrows>
                    <!-- <q-route-tab to="/page1" label="Page One" /> -->
                </q-tabs>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
</template>
