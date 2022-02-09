import Axios from 'axios';

const api = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export default api;
