import React, { useState } from 'react';

const images = [
    '/assets/cara1.jpg',
    '/assets/cara2.jpg',
    '/assets/cara3.jpg',
    '/assets/cara4.jpg',
];

function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrevClick = () => {
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setActiveIndex((activeIndex + 1) % images.length);
    };

    return (
        <div className="relative w-full">
            <div className="absolute inset-0 flex justify-center items-center">
                <img
                    src={images[activeIndex]}
                    alt="Carousel"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-y-0 left-0 flex justify-center items-center">
                <button
                    className="bg-white bg-opacity-25 hover:bg-opacity-50 text-white text-2xl px-4 py-2 rounded-l-full focus:outline-none"
                    onClick={handlePrevClick}
                >
                    &#8249;
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex justify-center items-center">
                <button
                    className="bg-white bg-opacity-25 hover:bg-opacity-50 text-white text-2xl px-4 py-2 rounded-r-full focus:outline-none"
                    onClick={handleNextClick}
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
}

export default Carousel;