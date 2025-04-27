import { type QuasarPluginOptions, Dialog, Notify } from 'quasar'
import iconSet from 'quasar/icon-set/material-icons-round'
import lang from 'quasar/lang/es'

export const { VITE_API_URL } = import.meta.env as Env

export const theme: QuasarPluginOptions = {
	plugins: { Dialog, Notify },
	config: {
		brand: {
			primary: '#F28028',
			secondary: '#F26929',
			accent: '#9C27B0',

			dark: '#333333',
			'dark-page': '#1d1d1d',

			positive: '#21BA45',
			negative: '#f44336',
			info: '#448aff',
			warning: '#fec408',
		},
		notify: {
			actions: [
				{
					icon: 'r_close',
					color: 'white',
					round: true,
					size: 'sm',
				},
			],
			timeout: 5000,
		},
	},
	iconSet,
	lang,
}
