import React from 'react'

const ProductContainer = ({ children }) => {
    return (
        <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mx-10 gap-6 mb-10'>
            {children}
        </div>
    )
}

export default ProductContainer