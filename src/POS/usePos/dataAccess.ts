import cashiers from './data/cashier_sample.json'
import products from './data/products_sample.json'
import { Domain } from '../types'
import sales from './data/sales_sample.json'
import { LS_DATA_KEY } from './CONSTANTS'
import { match, P } from 'ts-pattern'

const buildSeedData = (): Domain => ({
    cashiers,
    products,
    sales,
})

const getData = (): Domain | undefined => {
    try {
        return match(window.localStorage.getItem(LS_DATA_KEY))
            .with(P.nullish, () => undefined)
            .otherwise(JSON.parse)
    } catch (err) {
        console.error('Unable to get data.')
        return undefined
    }
}

const setData = (data: Domain) => {
    try {
        window.localStorage.setItem(LS_DATA_KEY, JSON.stringify(data))
        return data
    } catch (err) {
        console.error('Unable to set data.')
        return undefined
    }
}

const initData = () => {
    const seedData = getData() || buildSeedData()
    return setData(seedData)
}

export { initData, setData }
