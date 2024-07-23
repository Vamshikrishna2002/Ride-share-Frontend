import axios from 'axios'
import { userFields } from '../constants';

const BASE_URL = "http://localhost:8000";

export async function addRideDetails(data){
    return await axios.post(`${BASE_URL}/api/v1/ride/add`, data, {
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}

export async function updateRideDetails(data, rideId){
    return await axios.post(`${BASE_URL}/api/v1/ride/update/${rideId}`, data, {
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}

export async function getAllRides(){
    return await axios.get(`${BASE_URL}/api/v1/ride/get-all`, {
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}

export async function getMyRides(){
    return await axios.get(`${BASE_URL}/api/v1/ride/get-mine`, {
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}

export async function getStarredRides(){
    return await axios.get(`${BASE_URL}/api/v1/ride/get-starred`, {
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}

export async function updateStar(rideId){
    return await axios.get(`${BASE_URL}/api/v1/ride/update-star/${rideId}`, {
        headers:{
            "Authorization" : localStorage.getItem(userFields.jwtToken)
        },
    });
}