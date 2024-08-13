import { Button } from '@mui/material'
import { css } from '@emotion/react'
import { FC } from 'react'
import { usePOS } from '../usePos'
import { AddSaleForm } from './Form'

const AddSale: FC = () => {
    const { state, dispatch } = usePOS()
    return (
        <div css={styles}>
            <header>
                <Button
                    data-cy="back-to-dashboard"
                    variant="outlined"
                    onClick={() => {
                        dispatch({
                            type: 'SwitchScreen',
                            payload: { screen: 'dashboard' },
                        })
                    }}
                >
                    Back
                </Button>
                <h2>Add Sale</h2>
                <div />
            </header>
            <div>
                <AddSaleForm
                    products={state.domain.products}
                    onSubmit={saleAmount => {
                        dispatch({ type: 'AddSale', payload: { saleAmount } })
                    }}
                />
            </div>
        </div>
    )
}

const styles = css`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template: auto 1fr / minmax(0, 1fr);
    background-color: #fff;

    > header {
        padding: 0.5rem 4vw;
        background: linear-gradient(175deg, #eee, #ddd);
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h2 {
        flex: 1;
        text-align: center;
        padding-right: 5rem;
    }

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export { AddSale }
