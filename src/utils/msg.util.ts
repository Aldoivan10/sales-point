import { type QVueGlobals } from 'quasar'

export function okToast($q: QVueGlobals, msg: string) {
    $q.notify({ type: 'positive', message: `<b>EXITO:</b> ${msg}`, html: true })
}

export function errorToast($q: QVueGlobals, msg: string, id?: string) {
    $q.notify({
        type: 'negative',
        message: `<b>ERROR${id ? ' [' + id + ']' : ''}:</b> ${msg}`,
        html: true,
    })
}
