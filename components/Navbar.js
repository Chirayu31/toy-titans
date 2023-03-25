function Navbar() {
    return (
        <>
            <div className="flex flex-row justify-between pt-7 ml-[10px] sm:ml-[49px]">
                <div className="branding">
                    <h1 className="text-2xl text-white sm:text-4xl md:text-5xl font-chakra font-bold">Toy Titans</h1>
                </div>
                <div className='btn-grp flex flex-row items-center justify-evenly w-1/2'>
                    <p className="text-base text-white sm:text-lg  font-semibold">Explore</p>
                    <p className="text-base text-white sm:text-lg  font-semibold">Your Cart</p>
                </div>
            </div>
        </>
    )
}

export default Navbar