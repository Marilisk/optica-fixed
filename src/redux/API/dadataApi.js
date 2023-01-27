import axios from "axios";


const dadataFetch = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        'Authorization': 'Token 288732486ec72eee4a1d262d9563011edc5d4b2e',
        'X-Secret': 'fd437751e861f9a8799bba3798cf06f2e0fced62',
    },
    

})



export default dadataFetch;