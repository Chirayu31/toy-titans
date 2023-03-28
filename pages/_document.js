import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body className='text-white'>

        <div className="flex flex-row justify-between pt-7 ml-[10px] sm:ml-[49px]">
          <div className="branding">
            <Link href="/">
              <h1 className="text-2xl text-white sm:text-4xl md:text-5xl font-chakra font-bold">Toy Titans</h1>
            </Link>
          </div>
          <div className='btn-grp flex flex-row items-center justify-evenly w-1/2'>
            <Link href="/explore">
              <p className="text-base text-white sm:text-lg  font-semibold">
                Explore
              </p>
            </Link>
            <Link href="/cart">
              <p className="text-base text-white sm:text-lg  font-semibold">Cart</p>
            </Link>
            <Link href="/orders">
              <p className="text-base text-white sm:text-lg  font-semibold">Orders</p>
            </Link>
          </div>
        </div>

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
