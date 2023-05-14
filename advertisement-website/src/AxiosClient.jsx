import Axios from 'axios';

const token = localStorage.getItem('token');

const AxiosClient = Axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    withCredentials: false
});


export default AxiosClient;