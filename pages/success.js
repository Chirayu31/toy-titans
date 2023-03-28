import { indexedDb } from '@/utils/indexDb'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'

function Success() {
    const router = useRouter()
    const products = useLiveQuery(() => indexedDb.products.toArray());
    const { data: session } = useSession()

    async function createOrder(ids, email) {
        try {
            await axios.post('/api/order/createOrder', {
                ids,
                email
            })

            indexedDb.products.clear()
            // router.push('/')
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        let ids = products?.map(product => product?.product_id)

        if (ids?.length && session) {
            createOrder(ids, session?.user.email)
        }
    }, [products, session])

    return (
        <div className="flex flex-col items-center min-h-screen mt-40">
            <h2 className="text-4xl font-semibold">Thanks for shopping with us</h2>
        </div>
    );
}

export default Success;