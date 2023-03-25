import axios from 'axios'

export default async function fetchSearchResults(q, page) {
    const { data } = await axios.get(`/api/products/getsearchresults?q=${q}&page=${page}`)
    return data;
}