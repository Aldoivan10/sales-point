import type { QTableColumn } from 'quasar';
import 'vue';

declare global {
	namespace Route {
		type Link = { path: string; name: string }

		type Links = Record<string, Link>
	}

	namespace Menu {
		type Item = {
			title: string
			subtitle: string
			icon: string
			admin: boolean
			tooltip: string
			route: string
		}
	}

	namespace User {
		type Shortcut = {
			action: string
			shortcut: string
		}

		type State = {
			name: string
			logged: boolean
			views: Shortcut[]
			shortcuts: Shortcut[]
			route?: string
			search?: string
			itemsPerPage?: number
			page?: number
		}

		type Login = { username: string; password: string }
	}

	namespace Product {
		type Catalog = { id: number; name: string }

		type Code = Catalog & { code: string | null }

		type Unit = Catalog & { profit: number | null; sale: number }

		type Item = {
			id: number
			name: string
			amount: number
			min: number
			refundable: boolean
			buy: number
			supplier: Catalog
			department: Catalog
			codes: Code[]
			units: Unit[]
		}

		type Form = Item & {
			units: number[]
		}
	}

	namespace Table {
		type Options = Partial<Pagination> & { search?: string }

		type Pagination = {
			page: number
			rowsNumber: number
			rowsPerPage: number
		}

		type Entity = Options & { type?: string }
	}

	namespace Form {
		type Rule = (value: string) => boolean | string
	}

	namespace Entity {
		type Item = {
			id: number
			rfc: string | null
			id_entity_type: number
			name: string
			address: string | null
			domicile: string | null
			postal_code: string | null
			phone: string | null
			email: string | null
			type: { id: number; name: string }
		}
	}

	namespace Kit {
		type Item = {
			id: number
			name: string
			products: Product.Item[]
		}
	}

	type APIFech<T> = { items: T[]; total: number }

	type APIParams = { limit?: number; offset?: number } & Record<string, any>

	type Role = 'info' | 'warning' | 'error' | 'success'

	type Maybe<T> = null | undefined | T

	type APIError = { id: string; msg: string }

	type Env = ImportMetaEnv & {
		VITE_API_URL: string
	}

	type Head = {
		key?: string
		title?: string
		sortable?: boolean
		value: SelectItemKey<T>
	}

	type ProductTableData = {
		rows: Array<Product.Item | Kit.Item>
		columns: QTableColumn[]
		loading: boolean
		tooltip: string
		title: string
	}

	type CatalogItem = {
		total: number,
		loading: boolean,
		error?: APIError,
		endPoint: string,
		items: Product.Catalog[]
	}
}

export { };

declare module 'vue-router' {
	interface RouteMeta {
		requireAdmin?: boolean
		requiresUser?: boolean
	}
}
