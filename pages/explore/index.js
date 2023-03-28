import React, { useCallback, useEffect, useRef, useReducer } from 'react';
import ProductCard from '@/components/Explore/ProductCard';
import ProductContainer from '@/components/Explore/ProductContainer';
import fetchProducts from '@/utils/fetchProducts';
import fetchSearchResults from '@/utils/fetchSearchResults';
import { RotatingSquare } from 'react-loader-spinner';
import axios from 'axios';

const initialState = {
    products: [],
    page: 0,
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'setProducts':
            return { ...state, products: action.payload };
        case 'setPage':
            return { ...state, page: action.payload };
        case 'setLoading':
            return { ...state, loading: action.payload };
        case 'setError':
            return { ...state, error: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const Explore = () => {
    const queryRef = useRef();

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: 'setPage', payload: 0 });
        async function fetchData() {
            try {
                dispatch({ type: 'setLoading', payload: true });
                const data = await fetchProducts(0);
                dispatch({ type: 'setProducts', payload: data });
                dispatch({ type: 'setLoading', payload: false });
            } catch (error) {
                dispatch({ type: 'setError', payload: error.message });
            }
        }
        fetchData();
    }, []);

    const searchHandler = (e) => {
        e.preventDefault()
        // console.log(queryRef.current.value)
        const q = queryRef.current.value ?? '';

        async function fetchResults() {
            try {
                dispatch({ type: 'setLoading', payload: true });
                dispatch({ type: 'setProducts', payload: [] });
                const data = await fetchSearchResults(q, state.page);
                dispatch({ type: 'setProducts', payload: data });
                // console.log(data);
                dispatch({ type: 'setLoading', payload: false });
            } catch (error) {
                dispatch({ type: 'setError', payload: error.message });
            }
        }
        fetchResults();

    }

    const loadHandler = (e) => {
        e.preventDefault()
        dispatch({ type: 'setPage', payload: state.page + 1 });

        async function fetchData() {
            try {
                dispatch({ type: 'setLoading', payload: true });

                const newData = await Promise.all([
                    fetchProducts(state.page + 1), // Fetch the new data
                    new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second (optional)
                ])

                dispatch({ type: 'setProducts', payload: [...state.products, ...newData[0]] });

                dispatch({ type: 'setLoading', payload: false });

            } catch (error) {
                dispatch({ type: 'setError', payload: error.message });
            }
        }
        fetchData();
    }

    return (
        <div>
            <div className='w-full flex justify-center mt-12'>
                <input type="text"
                    className='w-5/6 max-w-[500px] h-10 px-2 bg-transparent outline-none text-lg sm:text-xl border-b-2'
                    name="search"
                    placeholder='Search here ...'
                    ref={queryRef}
                    autoComplete="off" />

                <button onClick={e => searchHandler(e)}> Search </button>
            </div>
            <ProductContainer>
                {state.products.map(product => <ProductCard key={product._id} {...product} />)}
            </ProductContainer>


            <div className='w-full flex justify-center mt-12'>
                {state.loading ? <RotatingSquare
                    height="100"
                    width="100"
                    color="#ffffff"
                    ariaLabel="rotating-square-loading"
                    strokeWidth="2"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /> : <button className='mb-2 border-2 border-white p-1' onClick={e => loadHandler(e)}> Load more </button>}

            </div>
        </div>
    )
}

export default Explore