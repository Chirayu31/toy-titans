import axios from 'axios'

export default async function fetchProducts(page) {
    const { data } = await axios.get(`/api/products/getproducts?page=${page}`)
    return data;
}