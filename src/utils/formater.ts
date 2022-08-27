export function currency(price: number) {
    const options: Intl.NumberFormatOptions =  {
        style: 'currency',
        currency: 'USD',
    }
    return new Intl.NumberFormat('pt-BR', options).format(price)
}

export default currency;