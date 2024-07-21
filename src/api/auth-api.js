import axios from 'axios'

const BASE_URL = "http://localhost:8000";

export async function login(data){
    return await axios.post(`${BASE_URL}/api/v1/auth/login`,data);
}

export async function register(data){
    return await axios.post(`${BASE_URL}/api/v1/auth/register`,data);
}