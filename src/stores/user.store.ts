import { useApiClient } from '@aldoivan10/v-api-client/composable'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
	const availibleUsers = ref<User.State[]>([])
	const error = ref('')
	const api = useApiClient()

	async function findSystemUsers() {
		error.value = ''
		const response = await api.get<User.State[]>({ url: '/users' })
		if (response.ok) availibleUsers.value = response.body
		else error.value = 'Error al conectar con la base de datos'
	}

	async function findUser(username: string, password?: string) {
		if (password)
			return api.post<void>({
				url: '/login/admin',
				body: { password, username },
				credentials: 'include',
			})
		return api.post<User.State>({
			url: '/login',
			body: { username },
			credentials: 'include',
		})
	}

	async function logout(username: string) {
		return api.post<void>({
			url: '/logout',
			body: { username },
			credentials: 'include',
		})
	}

	return { availibleUsers, error, findSystemUsers, findUser, logout }
})
