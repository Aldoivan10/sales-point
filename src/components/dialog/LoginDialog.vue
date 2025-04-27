<script setup lang="ts">
import { ref } from 'vue'
import {
	useDialogPluginComponent,
	useQuasar,
	type ValidationRule,
} from 'quasar'
import { useUserStore } from '@/stores/user.store'
import { useTabStore } from '@/stores/tab.store'
import { errorToast, okToast } from '@/utils/msg.util'

defineEmits([...useDialogPluginComponent.emits])
const $q = useQuasar()

const { user } = useTabStore()
const userStore = useUserStore()
const login = ref<User.Login>({ username: user?.name ?? '', password: '' })
const { isLogin = false } = defineProps<{ isLogin?: boolean }>()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
	useDialogPluginComponent()

const requiredRules: ValidationRule[] = [
	(val) => Boolean(val) || 'El campo no puede estar vacío',
]
const autocomplete = ref(isLogin ? 'current-password' : 'new-password')
const showPass = ref(false)

async function loginUser() {
	const isAdmin = await userStore.findUser(
		login.value.username,
		login.value.password,
	)
	if (isAdmin.ok) {
		okToast($q, 'AHORA ERES ADMINISTRADOR')
		onDialogOK()
	} else errorToast($q, isAdmin.error.message, isAdmin.error.body?.id)
}

async function registerUser() {}
</script>

<template>
	<q-dialog ref="dialogRef" @hide="onDialogHide">
		<q-card class="q-dialog-plugin">
			<q-card-section class="!py-3">
				<div
					class="text-h6 text-secondary font-bold flex items-center gap-2"
				>
					<q-icon name="r_manage_accounts" class="text-h4"></q-icon>
					IDENTIFICARSE
				</div>
			</q-card-section>
			<q-card-section>
				<q-form
					id="formLogin"
					class="flex flex-col gap-4"
					@submit="isLogin ? loginUser() : registerUser()"
				>
					<q-input
						class="[&:not(.q-field--error):focus-within_.q-icon]:text-primary [&:is(.q-field--error)_.q-icon]:text-negative"
						v-model="login.username"
						:rules="requiredRules"
						:autofocus="!isLogin"
						autocomplete="none"
						v-show="!isLogin"
						:hidden="isLogin"
						label="USUARIO"
						maxlength="64"
						counter
						filled
						dense
					>
						<template v-slot:prepend>
							<q-icon name="r_account_circle" />
						</template>
					</q-input>
					<q-input
						class="[&:not(.q-field--error):focus-within_.q-icon]:text-primary [&:is(.q-field--error)_.q-icon]:text-negative"
						:type="showPass ? 'text' : 'password'"
						v-model="login.password"
						:rules="requiredRules"
						label="CONTRASEÑA"
						:autofocus="isLogin"
						maxlength="10"
						:autocomplete
						counter
						filled
						dense
					>
						<template v-slot:prepend>
							<q-icon name="r_password" />
						</template>
						<template v-slot:append>
							<q-icon
								:name="
									showPass
										? 'r_visibility'
										: 'r_visibility_off'
								"
								@click="showPass = !showPass"
								class="cursor-pointer"
							/>
						</template>
					</q-input>
				</q-form>
			</q-card-section>
			<q-card-actions align="right">
				<q-btn @click="onDialogCancel" color="negative" flat
					>CANCELAR</q-btn
				>
				<q-btn form="formLogin" type="submit" color="primary" unelevated
					>ACEPTAR</q-btn
				>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
