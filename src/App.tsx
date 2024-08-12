import { FC } from 'react'
import { Pos, PosProvider } from './POS'

const App: FC = () => (
    <PosProvider>
        <Pos />
    </PosProvider>
)

export default App
