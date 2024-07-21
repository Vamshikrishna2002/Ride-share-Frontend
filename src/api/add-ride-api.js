import axios from 'axios'

const BASE_URL = "http://localhost:8000";

export async function addRideDetails(data){
    return await axios.post(`${BASE_URL}/api/v1/ride/add`,data);
}
