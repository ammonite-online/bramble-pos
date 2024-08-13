import { match, P } from 'ts-pattern'
import {
    Action,
    AddSale,
    InitState,
    SelectCashier,
    State,
    SwitchScreen,
} from '../types'

const handleInitState =
    (prev: State | undefined) =>
    ({ payload }: InitState): State | undefined =>
        match(prev)
            .with(P.nullish, () => ({
                domain: payload.data,
                ui: {
                    selectedCashier: payload.data.cashiers[0],
                    screen: 'selectCashier' as const,
                },
            }))
            .otherwise(() => prev)

const handleSelectCashier =
    (prev: State | undefined) =>
    ({ payload }: SelectCashier): State | undefined =>
        match(prev)
            .with(P.nullish, () => undefined)
            .otherwise(({ domain, ui }) => ({
                domain,
                ui: {
                    ...ui,
                    selectedCashier: prev?.domain.cashiers.find(
                        ({ id }) => id === payload.cashierId
                    ),
                },
            }))

const handleSwitchScreen =
    (prev: State | undefined) =>
    ({ payload: { screen } }: SwitchScreen): State | undefined =>
        match(prev)
            .with(P.nullish, () => undefined)
            .otherwise(({ domain, ui }) => ({
                domain,
                ui: {
                    ...ui,
                    screen,
                },
            }))

const handleAddSale =
    (prev: State | undefined) =>
    ({ payload: { saleAmount } }: AddSale): State | undefined =>
        match(prev)
            .with(P.nullish, () => undefined)
            .otherwise(prev =>
                match(prev.ui.selectedCashier?.id)
                    .with(P.number, cashierId => {
                        const sales =
                            saleAmount > 0
                                ? [
                                      ...prev.domain.sales,
                                      {
                                          cashierId,
                                          saleAmount,
                                      },
                                  ]
                                : prev.domain.sales
                        const domain = {
                            ...prev.domain,
                            sales,
                        }
                        return {
                            domain,
                            ui: {
                                ...prev.ui,
                                screen: 'dashboard' as const,
                            },
                        }
                    })
                    .otherwise(() => prev)
            )

const reducer = (prev: State | undefined, action: Action): State | undefined =>
    match(action)
        .with({ type: 'InitState' }, handleInitState(prev))
        .with({ type: 'SelectCashier' }, handleSelectCashier(prev))
        .with({ type: 'SwitchScreen' }, handleSwitchScreen(prev))
        .with({ type: 'AddSale' }, handleAddSale(prev))
        .exhaustive()

export { reducer }
