import { reducer } from '../reducer'

describe('reducer', () => {
    test('given an undefined state and an InitState actions, should return init state', () => {
        expect(
            reducer(undefined, {
                type: 'InitState',
                payload: { data: { cashiers: [], products: [], sales: [] } },
            })
        ).toEqual({
            domain: { cashiers: [], products: [], sales: [] },
            ui: { selectedCashier: undefined, screen: 'selectCashier' },
        })

        expect(
            reducer(undefined, {
                type: 'InitState',
                payload: {
                    data: {
                        cashiers: [
                            { id: 1, name: 'Cashier 1' },
                            { id: 2, name: 'Cashier 2' },
                        ],
                        products: [],
                        sales: [],
                    },
                },
            })
        ).toEqual({
            domain: {
                cashiers: [
                    { id: 1, name: 'Cashier 1' },
                    { id: 2, name: 'Cashier 2' },
                ],
                products: [],
                sales: [],
            },
            ui: {
                selectedCashier: { id: 1, name: 'Cashier 1' },
                screen: 'selectCashier',
            },
        })
    })
})
