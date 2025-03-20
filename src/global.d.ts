import 'vue'

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
    }

    namespace Table {
        type Options = { page?: number; itemsPerPage?: number; search?: string }
    }

    namespace Form {
        type Rule = (value: string) => boolean | string
    }

    type APIFech<T> = { items: T[]; total: number }

    type APIParams = { limit?: number; offset?: number } & Record<string, any>

    type Role = 'info' | 'warning' | 'error' | 'success'

    type Maybe<T> = null | undefined | T

    type Env = ImportMetaEnv & {
        VITE_API_URL: string
    }

    type Head = {
        key?: string
        title?: string
        sortable?: boolean
        value: SelectItemKey<T>
    }
}

export {}
