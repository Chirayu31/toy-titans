import ProductCard from '@/components/Explore/ProductCard'
import ProductContainer from '@/components/Explore/ProductContainer'
import { indexedDb } from '@/utils/indexDb'
import { useLiveQuery } from 'dexie-react-hooks'
import CurrencyFormat from 'react-currency-format'
import { useSession, signIn } from "next-auth/react"
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);

const CartPage = () => {
    const { data: session } = useSession()

    const products = useLiveQuery(() => indexedDb.products.toArray());

    function getSum(total, item) {
        return total + Number(item.price)
    }

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;

        const checkoutSession = await axios.post("/api/payment/create-checkout-session", {
            items: products,
            email: session.email,
        });

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) {
            alert(result.error.message);
        }

        console.log(checkoutSession.data)
    };

    return (
        <div className='my-5'>
            <h1 className='text-xl md:text-2xl text-center font-bold font-chakra'>Your Cart</h1>
            <ProductContainer>
                {products?.map(product =>
                    <ProductCard
                        key={product.id}
                        _id={product.product_id}
                        title={product.title}
                        price={product.price}
                        image={product.image} />
                )}
            </ProductContainer>
            <div className='flex justify-center gap-4 flex-wrap '>
                <p className='font-chakra text-xl'>
                    Your Total :
                    <span>
                        <CurrencyFormat value={products?.reduce(getSum, 0)} displayType={'text'} thousandSeparator={true} prefix={' Rs. '} />

                    </span>
                </p>
                {session && session.user ?
                    <button
                        className='border-2 border-white p-1'
                        onClick={createCheckOutSession}
                    >
                        Buy Now
                    </button> :
                    <button onClick={() => signIn("google")}>
                        Sign in
                    </button>}

            </div>
        </div>
    )
}

export default CartPage