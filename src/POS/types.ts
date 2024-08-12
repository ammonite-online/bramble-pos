import { Dispatch } from 'react'

// Domain

type Domain = {
    cashiers: Cashier[]
    products: Product[]
    sales: Sale[]
}

type Cashier = {
    id: number
    name: string
}

type Product = {
    sku: number
    name: string
    descr: string
    price: number
}

type Sale = {
    cashierId: Cashier['id']
    saleAmount: number
}

// Actions

type InitState = {
    type: 'InitState'
    payload: {
        data: Domain
    }
}

type SelectCashier = {
    type: 'SelectCashier'
    payload: {
        cashierId: Cashier['id']
    }
}

type SwitchScreen = {
    type: 'SwitchScreen'
    payload: {
        screen: State['ui']['screen']
    }
}

type AddSale = {
    type: 'AddSale'
    payload: { saleAmount: number }
}

type Action = InitState | SelectCashier | SwitchScreen | AddSale

// State

type State = {
    domain: Domain
    ui: {
        selectedCashier: Cashier | undefined
        screen: 'selectCashier' | 'dashboard' | 'addSale'
    }
}

type Ctx = {
    state: State
    dispatch: Dispatch<Action>
}

export type {
    Domain,
    Cashier,
    Product,
    Sale,
    InitState,
    SelectCashier,
    SwitchScreen,
    AddSale,
    Action,
    State,
    Ctx,
}
