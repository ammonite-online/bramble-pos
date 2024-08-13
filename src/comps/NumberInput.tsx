import { IconButton } from '@mui/material'
import { FC } from 'react'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import { Unstable_NumberInput } from '@mui/base/Unstable_NumberInput'

type Props = {
    ariaLabel: string
    value: number
    min: number
    step: number
    shiftMultiplier: number
    onChange: (value: number) => void
    onIncrement: () => void
    onDecrement: () => void
}

const NumberInput: FC<Props> = ({
    ariaLabel,
    value,
    min,
    step,
    shiftMultiplier,
    onChange,
    onIncrement,
    onDecrement,
}) => (
    <Unstable_NumberInput
        aria-label={ariaLabel}
        value={value}
        step={step}
        min={min}
        shiftMultiplier={shiftMultiplier}
        onChange={(_, value) => {
            onChange(value || 0)
        }}
        onInputChange={({ currentTarget: { value } }) => {
            onChange(value ? parseInt(value) : 0)
        }}
        slots={{
            root: 'aside',
            incrementButton: () => (
                <IconButton
                    data-cy="add-sale-item-increment"
                    className="increment"
                    size="small"
                    onClick={onIncrement}
                >
                    <ArrowUpward />
                </IconButton>
            ),
            decrementButton: () => (
                <IconButton
                    data-cy="add-sale-item-decrement"
                    className="decrement"
                    size="small"
                    onClick={onDecrement}
                    disabled={value < 1}
                >
                    <ArrowDownward />
                </IconButton>
            ),
        }}
    />
)

export { NumberInput }
