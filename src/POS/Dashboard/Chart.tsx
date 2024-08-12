import { css } from '@emotion/react'
import { FC } from 'react'
import { BarChart } from '@mui/x-charts'

type Props = {
    bars: {
        label: string
        value: number
    }[]
}

const SalesChart: FC<Props> = ({ bars }) => (
    <div css={styles}>
        <BarChart
            xAxis={[
                {
                    scaleType: 'band',
                    data: bars.map(({ label }) => label),
                },
            ]}
            series={[
                {
                    data: bars.map(({ value }) => value),
                },
            ]}
            width={500}
            height={300}
        />
    </div>
)

const styles = css`
    > div {
        width: auto;
        height: 33vh;
    }
`

export { SalesChart }
