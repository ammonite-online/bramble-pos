import { Avatar, Button } from '@mui/material'
import { css } from '@emotion/react'
import { FC } from 'react'
import { usePOS } from '../usePos'
import { SalesChart } from './Chart'
import { State } from '../types'
import { roundToTwo } from '../utils'

type Acc = { [index: string]: number }

const buildAnaltyics = (state: State) =>
    Object.entries(
        state.domain.sales.reduce((acc: Acc, sale) => {
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

const Dashboard: FC = () => {
    const { state, dispatch } = usePOS()
    return (
        <div css={styles}>
            <header>
                <div />
                <h2>Cashier Sales Statistics</h2>
                <Avatar
                    onClick={() => {
                        dispatch({
                            type: 'SwitchScreen',
                            payload: { screen: 'selectCashier' },
                        })
                    }}
                >
                    {`${state.ui.selectedCashier?.name[0]}${state.ui.selectedCashier?.id}`}
                </Avatar>
            </header>
            <div>
                <SalesChart bars={buildAnaltyics(state)} />
            </div>
            <footer>
                <Button
                    variant="outlined"
                    onClick={() => {
                        dispatch({
                            type: 'SwitchScreen',
                            payload: { screen: 'selectCashier' },
                        })
                    }}
                >
                    Switch cashier
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        dispatch({
                            type: 'SwitchScreen',
                            payload: { screen: 'addSale' },
                        })
                    }}
                >
                    Add sale
                </Button>
            </footer>
        </div>
    )
}

const styles = css`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template: auto 1fr auto / minmax(0, 1fr);
    background-color: #fff;

    > header {
        padding: 0.5rem 4vw;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        background: linear-gradient(175deg, #eee, #ddd);
        align-items: center;
    }

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    > footer {
        border-top: 1px solid #eee;
        padding: 0.5rem 4vw;
        display: flex;
        justify-content: space-between;
        background: linear-gradient(175deg, #eee, #ddd);
    }
`

export { Dashboard }
