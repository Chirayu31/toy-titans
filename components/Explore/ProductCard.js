import { indexedDb } from '@/utils/indexDb'
import { useLiveQuery } from 'dexie-react-hooks'
import Image from 'next/image'
import React, { useState } from 'react'
import CurrencyFormatter from '../CurrencyFormatter';

const ProductCard = ({ _id, title, price, image }) => {

    const [status, setStatus] = useState(false)

    const exists = useLiveQuery(
        async () => {
            const count = await indexedDb.products.where('product_id').equals(_id).count()
            if (count == 1) {
                setStatus(true)
            }
            return count
        },
        []
    )

    const addToCartHandler = async (e) => {
        e.preventDefault()
        async function addProduct() {
            try {
                const id = await indexedDb.products.add({
                    product_id: _id,
                    title,
                    image,
                    price,
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        addProduct();
        setStatus(true)
    }

    const removeFromCartHandler = async (e) => {
        e.preventDefault()
        async function deleteProduct() {
            try {
                await indexedDb.products.where('product_id').equals(_id).delete()
            } catch (error) {
                console.log(error.message)
            }
        }
        deleteProduct();
        setStatus(false)
    }

    return (
        <div className='bg-white text-black w-full max-w-[421px] max-h-fit rounded drop-shadow-[10px_15px_58px_rgba(29, 27, 27, 1)] '>
            <div className='max-h-[327px]'>
                <Image
                    src={`https:${image}`}
                    width={421}
                    height={300}
                    alt={'product image'}
                    className='max-h-[327px] object-center object-contain' />
            </div>

            <div>
                <p className='font-medium px-2'>
                    {title}
                </p>
                <p className='text-center text-xl font-bold'>
                    {<CurrencyFormatter amount={price} currency='INR' />}
                </p>
            </div>
            <div className='flex w-full justify-center gap-2 my-2 '>
                {status ? <>
                    <button
                        className='text-green-500 p-1 font-semibold'
                    >
                        Added to cart
                    </button>
                    <button
                        className='border-2 text-red-500 p-1 font-semibold'
                        onClick={e => removeFromCartHandler(e)}
                    >
                        Remove
                    </button>
                </>
                    :
                    <button
                        onClick={e => addToCartHandler(e)}
                        className='border-2 border-black p-1 font-semibold'
                    >
                        Add to cart
                    </button>
                }

            </div>
        </div>
    )
}

export default ProductCard