import {
    roundToTwo,
    calculateSaleAmount,
    calculateItemTotal,
    buildAnaltyics,
} from '../utils'

test('roundToTwo', () => {
    expect(roundToTwo(10)).toBe(10)
    expect(roundToTwo(10.9999)).toBe(11)
    expect(roundToTwo(10.00001)).toBe(10)
    expect(roundToTwo(10.664)).toBe(10.66)
    expect(roundToTwo(10.665)).toBe(10.66)
    expect(roundToTwo(10.666)).toBe(10.67)
})

test('calculateItemTotal', () => {
    expect(
        calculateItemTotal({
            product: { sku: 1, name: 'foo', descr: 'foo', price: 19.99 },
            qty: 3,
        })
    ).toBe(59.97)
})

test('calculateSaleAmount', () => {
    expect(
        calculateSaleAmount([
            {
                product: { sku: 1, name: 'foo', descr: 'foo', price: 19.99 },
                qty: 3,
            },
            {
                product: { sku: 2, name: 'foo', descr: 'foo', price: 400 },
                qty: 2,
            },
        ])
    ).toBe(859.97)
})

describe('buildAnaltyics', () => {
    test('given no sales, returns empty array', () => {
        expect(
            buildAnaltyics({
                cashiers: [
                    { id: 1, name: 'Cashier 1' },
                    { id: 2, name: 'Cashier 2' },
                    { id: 3, name: 'Cashier 3' },
                ],
                sales: [],
            })
        ).toEqual([])
    })
    test('given sales, returns analytics data', () => {
        const cashiers = [
            { id: 1, name: 'Cashier 1' },
            { id: 2, name: 'Cashier 2' },
            { id: 3, name: 'Cashier 3' },
        ]
        expect(
            buildAnaltyics({
                cashiers: [
                    { id: 1, name: 'Cashier 1' },
                    { id: 2, name: 'Cashier 2' },
                    { id: 3, name: 'Cashier 3' },
                ],
                sales: [
                    {
                        cashierId: cashiers[0].id,
                        saleAmount: 10,
                    },
                    {
                        cashierId: cashiers[0].id,
                        saleAmount: 20,
                    },
                    {
                        cashierId: cashiers[0].id,
                        saleAmount: 40,
                    },
                    {
                        cashierId: cashiers[1].id,
                        saleAmount: 100,
                    },
                    {
                        cashierId: cashiers[1].id,
                        saleAmount: 20,
                    },
                    {
                        cashierId: cashiers[2].id,
                        saleAmount: 5,
                    },
                ],
            })
        ).toEqual([
            { label: 'Cashier 1', value: 70 },
            { label: 'Cashier 2', value: 120 },
            { label: 'Cashier 3', value: 5 },
        ])
    })
})
