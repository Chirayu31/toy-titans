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
    const [done, setDone] = useState(0)
    // console.log(products)
    useEffect(() => {
        let ids = []
        products?.map(product => ids.push(product?.product_id))

        async function createPost() {
            if (ids.length >= 1 && session && !done) {
                try {
                    await axios.post('/api/order/createOrder', {
                        ids,
                        email: session?.user.email
                    })

                    indexedDb.products.clear()
                    router.push('/')
                    setDone(1)
                    // console.log(data)
                } catch (error) {
                    console.log(error.message)
                }

            }
        }
        createPost()

    }, [products, router, session, done])

    return (
        <div className="flex flex-col items-center min-h-screen mt-40">
            <h2 className="text-4xl font-semibold">Thanks for shopping with us</h2>
        </div>
    );
}

export default Success;