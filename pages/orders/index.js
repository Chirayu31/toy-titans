import OrderView from '@/components/Orders/OrderView'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Orders = () => {
    const { data: session } = useSession()
    const [order, setOrder] = useState([])

    useEffect(() => {
        async function fetchOrder() {
            const { data } = await axios.post('/api/order/viewOrder', { email: session.user.email })
            setOrder(data)
            console.log(data)
        }
        if (session && session.user.email) {
            fetchOrder()
        }
    }, [session])

    return (
        <div>
            {!session ? <div className='flex flex-col justify-center items-center '>
                <p className='text-center'>
                    Please Log in first!
                </p>
                <button className='border-2 border-white w-20 mt-10 p-1' onClick={() => signIn("google")}>
                    Sign in
                </button>
            </div> :
                <>
                    <h1 className='text-center font-chakra font-bold text-xl mt-10'>Your Orders</h1>
                    <OrderView data={order} />

                </>
            }
        </div>
    )
}

export default Orders