import React from 'react'

const Typography = () => {
    return (
        <div className='max-md:order-2 max-md:mt-10 flex flex-col items-center md:col-span-2 mx-6 md:mx-20 '>
            <h1 className='text-3xl lg:text-5xl font-bold font-chakra max-w-[700px]'>
                Discover the World of Action Figures at Toy Titan.
            </h1>
            <p className='text-lg lg:text-xl font-semibold font-chakra mt-12 lg:mt-20 max-w-[700px]'>
                At Toy Titan, we're passionate about all things action figures. Our collection includes a vast range of popular characters from movies, TV shows, and video games. We take pride in providing our customers with the latest and most sought-after action figures on the market. Whether you're a serious collector or a casual fan, you're sure to find something that catches your eye. Explore our selection today and add some excitement to your collection!
            </p>
            <button className='border-white border-2 w-72 h-12 rounded text-xl font-semibold font-chakra mt-20'>Shop Now</button>
        </div>
    )
}

export default Typography