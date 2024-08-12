import {
    createContext,
    useContext,
} from 'react'
import { Ctx } from '../types'


const ctx = createContext<Ctx | undefined>(undefined)
const { Provider } = ctx

const usePOS = () => {
    const context = useContext(ctx)
    if (!context)
        throw new Error('usePOS must be used within the DataAccess Provider')
    return context
}

export { Provider, usePOS }