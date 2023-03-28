import { SessionProvider } from "next-auth/react"
import Head from "next/head"
import '../styles/globals.css'


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Toy Titans</title>
        <meta name="description" content="Toy titans - An action figure selling ecommerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />

    </SessionProvider>
  )
}