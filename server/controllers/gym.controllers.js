import { ApiResponse } from "../utils/ApiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from 'axios';

const findNearbyGyms=asyncHandler(async(req, res)=>{
    const {coordinates}=req.body
    const options = {
    method: 'GET',
    url: 'https://map-places.p.rapidapi.com/nearbysearch/json',
    params: {
        location: `${coordinates.lat},${coordinates.long}`,
        radius: '1500',
        type: 'gym'
    },
    headers: {
        'X-RapidAPI-Key': '613e5f48b5mshb5bc8c987ced152p1c6567jsnd24e699e5ec5',
        'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data);
        res
        .status(201)
        .json(new ApiResponse(201,response?.data,"nearby gyms fetched successfully"))
    } catch (error) {
        console.error(error);
        throw new apiError(502, "Error while fetching nearby gyms")
    }
})

export {findNearbyGyms}