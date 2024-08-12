import { FC, ReactNode, useEffect, useReducer } from "react"
import { reducer } from "./reducer"
import { match, P } from "ts-pattern"
import { initData } from "./dataAccess"
import { Provider } from "./context"
import { CircularProgress } from "@mui/material"

const PosProvider: FC<{
    children: ReactNode
}> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, undefined)

    useEffect(() => {
        match(initData())
            .with(P.nullish, () => {
                alert(
                    'Unable to load seed data. Please reload the page and try again.'
                )
            })
            .otherwise(data =>
                dispatch({ type: 'InitState', payload: { data } })
            )
    }, [])

    return (
        <Provider value={state && { state, dispatch }}>
            {match(state)
                .with(P.nullish, () => <CircularProgress />)
                .otherwise(() => children)}
        </Provider>
    )
}

export { PosProvider }