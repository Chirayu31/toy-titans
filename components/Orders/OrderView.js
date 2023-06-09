import React from 'react'
import CurrencyFormatter from '../CurrencyFormatter'

const OrderView = ({ data }) => {
    return (
        <div >
            {data.map((order, idx) => (<div key={idx} className='border-white border-2 my-2'>
                <div className='flex flex-row justify-evenly'>
                    <h3 className='font-chakra text-xl'>{`Order #${idx + 1}`}</h3>
                    <p className='text-gray-500'>{`Ordered On : ${order.createdAt}`}</p>
                </div>
                <div>
                    {order.products.map((item, idx) => (
                        <>
                            <div key={idx} className='flex justify-between mx-2 my-2'>
                                <p className='text-base'>{`${idx + 1}. ${item.title}`}</p>
                                <p className='whitespace-nowrap'>{
                                    <CurrencyFormatter amount={item.price} currency='INR' />
                                }</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            ))}
        </div>
    )
}

export default OrderView