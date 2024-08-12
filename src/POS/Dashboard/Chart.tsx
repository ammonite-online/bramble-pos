import { FC } from 'react'
import { BarChart } from '@mui/x-charts'

type Props = {
    bars: {
        label: string
        value: number
    }[]
}

const SalesChart: FC<Props> = ({ bars }) => (
    <BarChart
        xAxis={[
            {
                scaleType: 'band',
                data: bars.map(({ label }) => label),
            },
        ]}
        series={[
            {
                label: 'Total sales',
                data: bars.map(({ value }) => value),
            },
        ]}
    />
)

export { SalesChart }
