import { FC } from 'react'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { usePOS } from './usePos'
import { match, P } from 'ts-pattern'
import { css  } from '@emotion/react'


const CashierSelection: FC = () => {
    const { state, dispatch } = usePOS()

    return (
        <div css={styles}>
            <div>
                <FormControl>
                    <FormLabel id="cashier-selection">Select cashier</FormLabel>
                    <RadioGroup
                        aria-labelledby="cashier-selection"
                        value={state.ui.selectedCashier?.id}
                        name="radio-buttons-group"
                        onChange={({ currentTarget: { value } }) =>
                            match(parseInt(value))
                                .with(P.number, cashierId => {
                                    dispatch({
                                        type: 'SelectCashier',
                                        payload: { cashierId },
                                    })
                                })
                                .otherwise(() =>
                                    console.error(
                                        'Unable to parse number from cashier selection form'
                                    )
                                )
                        }
                    >
                        {state.domain.cashiers.map(({ id, name }) => (
                            <FormControlLabel
                                key={id}
                                value={id}
                                control={<Radio />}
                                label={name}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}

const styles = css`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(175deg, #eee, #ddd);
    
    > div {
        background-color: #fff;
        border: 1px solid #eee;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
    }
`

export { CashierSelection }
