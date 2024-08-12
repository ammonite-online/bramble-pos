import { Product } from './types'

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

export { roundToTwo, calculateSaleAmount, calculateItemTotal }
