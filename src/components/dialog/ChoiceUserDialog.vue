<script setup lang="ts">
import { useTabStore } from '@/stores/tab.store'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useDialogPluginComponent, useQuasar } from 'quasar'

const $q = useQuasar()
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()
const userStore = useUserStore()
const tabStore = useTabStore()
const { availibleUsers: users } = storeToRefs(userStore)
const { tabs } = storeToRefs(tabStore)

const $emit = defineEmits([...useDialogPluginComponent.emits])

function getSequence(num: number) {
    return num.toString().split('').join(' ')
}

function disabled(user: User.State) {
    const finded = tabs.value.find((u) => user.name == u.name)
    return Boolean(finded)
}

async function login(user: User.State) {
    const res = await userStore.findUser(user.name)
    if (res.ok) onDialogOK(user)
    else
        $q.notify({
            type: 'negative',
            message: 'EL USUARIO NO EXISTE',
            html: true,
        })
}

onMounted(async () => await userStore.findSystemUsers())
</script>

<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">
        <q-card class="q-dialog-plugin">
            <q-card-section class="!py-3">
                <div class="text-h6 text-secondary font-bold flex items-center gap-2">
                    <q-icon name="r_supervisor_account" class="text-h5"></q-icon>
                    SELECCIONAR USUARIO
                </div>
            </q-card-section>
            <q-card-section class="flex flex-col gap-2">
                <q-btn
                    v-for="(user, key) in users"
                    :disable="disabled(user)"
                    @click="login(user)"
                    :label="user.name"
                    color="primary"
                    :key
                    flat
                />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
