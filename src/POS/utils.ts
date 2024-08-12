import { Product, State } from './types'

const roundToTwo = (input: number) => parseFloat(input.toFixed(2))

type Item = {
    product: Product
    qty: number
}

type CalculateSaleAmount = (items: Item[]) => number
const calculateSaleAmount: CalculateSaleAmount = items =>
    roundToTwo(
        items.reduce((acc: number, item) => acc + calculateItemTotal(item), 0)
    )

type CalculateItemTotal = (item: Item) => number
const calculateItemTotal: CalculateItemTotal = ({ product, qty }) =>
    roundToTwo(product.price * qty)

type BuildAnalytics = (state: State) => {
    label: string
    value: number
}[]
const buildAnaltyics: BuildAnalytics = state =>
    Object.entries(
        state.domain.sales.reduce((acc: { [index: string]: number }, sale) => {
            const label = state.domain.cashiers.find(
                ({ id }) => id === sale.cashierId
            )?.name
            const prev = (label && acc[label]) || 0
            const next = roundToTwo(prev + sale.saleAmount)
            return label
                ? {
                      ...acc,
                      [label]: next,
                  }
                : acc
        }, {})
    ).map(([label, value]) => ({ label, value }))

export { roundToTwo, calculateSaleAmount, calculateItemTotal, buildAnaltyics }
