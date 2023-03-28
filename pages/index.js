import Typography from '@/components/Home/Typography'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>

      {/* Typography and side Image */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-20'>
        <Typography />
        <div className='max-md:order-1 flex flex-col items-center  mr-10'>
          <Image src='/assets/01.png' alt='Nezuko Action Figure Image ' width={600} height={400} />
        </div>
      </div>
    </>
  )
}
