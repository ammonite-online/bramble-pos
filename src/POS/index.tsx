import { FC } from 'react'
import { match } from 'ts-pattern'
import { CashierSelection } from './CashierSelection'
import { Dashboard } from './Dashboard'
import { usePOS } from './usePos'
import { PosProvider } from './usePos/PosProvider'
import { css } from '@emotion/react'
import { AddSale } from './AddSale'

const Pos: FC = () => {
    const {
        state: {
            ui: { screen },
        },
    } = usePOS()

    return (
        <main css={styles}>
            {match(screen)
                .with('selectCashier', () => <CashierSelection />)
                .with('dashboard', () => <Dashboard />)
                .with('addSale', () => <AddSale />)
                .exhaustive()}
        </main>
    )
}

const styles = css`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(175deg, #222, #333);

    > div {
        height: 100vh;
        width: 100vw;
        max-width: 40rem;
        margin: 0 auto;
    }
`

export { Pos, PosProvider }
