const percentFormat = new Intl.NumberFormat('es-MX', { style: 'percent', maximumFractionDigits: 2 })
const priceFormat = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
})
const roundFormat = new Intl.NumberFormat('es-MX', { style: 'decimal', maximumFractionDigits: 2 })

export function toPercent(num: number) {
    return percentFormat.format(num / 100)
}

export function toPrice(num: number) {
    return priceFormat.format(num)
}

export function round(num: number) {
    return roundFormat.format(num)
}
