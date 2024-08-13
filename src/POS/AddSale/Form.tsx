import { FC, useState } from 'react'
import { Product } from '../types'
import { css } from '@emotion/react'
import { Button, FormControl } from '@mui/material'
import { calculateItemTotal, calculateSaleAmount } from '../utils'
import { NumberInput } from '../../comps/NumberInput'

type Props = {
    products: Product[]
    onSubmit: (saleAmount: number) => void
}

type Item = {
    product: Product
    qty: number
}

const AddSaleForm: FC<Props> = ({ products, onSubmit }) => {
    const [items, setItems] = useState<Item[]>(
        products.map(product => ({ product, qty: 0 }))
    )

    return (
        <FormControl css={styles}>
            <ul>
                {items.map(({ product, qty }) => (
                    <li
                        data-cy="add-sale-item"
                        css={rowStyles}
                        key={product.sku}
                    >
                        <header>
                            <div>
                                <h3>{product.name}</h3>
                                <p>{product.descr}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                        </header>
                        <div>
                            <NumberInput
                                value={qty}
                                step={1}
                                ariaLabel="Product quantity"
                                min={0}
                                shiftMultiplier={10}
                                onChange={qty => {
                                    setItems(prev =>
                                        prev.map(item =>
                                            item.product.sku === product.sku
                                                ? {
                                                      product: item.product,
                                                      qty,
                                                  }
                                                : item
                                        )
                                    )
                                }}
                                onIncrement={() =>
                                    setItems(prev =>
                                        prev.map(item =>
                                            item.product.sku === product.sku
                                                ? {
                                                      product: item.product,
                                                      qty: item.qty + 1,
                                                  }
                                                : item
                                        )
                                    )
                                }
                                onDecrement={() =>
                                    setItems(prev =>
                                        prev.map(item =>
                                            item.product.sku === product.sku
                                                ? {
                                                      product: item.product,
                                                      qty: item.qty - 1,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            />
                            <p>
                                Total: ${calculateItemTotal({ product, qty })}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            <footer>
                <Button
                    data-cy="add-sale-submit"
                    variant="contained"
                    onClick={() => onSubmit(calculateSaleAmount(items))}
                >
                    Submit
                </Button>
            </footer>
        </FormControl>
    )
}

const styles = css`
    width: 100%;
    height: 100%;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
    }

    > footer {
        display: flex;
        justify-content: center;
        padding: 1rem;
    }
`

const rowStyles = css`
    padding: 1rem 4vw;
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid #ddd;

    header {
        flex: 1;
        display: flex;
        justify-content: space-between;

        p {
            padding: 0;
            margin: 0;
            color: #333;
        }
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;

        p {
            padding: 1rem 0 0;
            margin: 0;
            color: #333;
            font-weight: bold;
        }
    }

    aside {
        display: grid;
        grid-template: auto / auto auto auto;
    }

    .decrement {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    .increment {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
    }

    input {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        width: 4ch;
        padding: 0.25rem;
    }
`

export { AddSaleForm }
