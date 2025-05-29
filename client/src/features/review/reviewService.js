import axios from "axios"
import { api } from "../../../api"

const getAllReview = async(token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${api}/admin/reviews` , options)
    return response.data
}

//get all reviews of single car
const fetchCarReviews = async(cid , token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${api}/car/${cid}/reviews` , options)
    return response.data
}

const addUserReview = async(cid , formData , token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(`${api}/car/${cid}/reviews/add` , formData , options)
    return response.data
}

const reviewService = {getAllReview , fetchCarReviews , addUserReview}

export default reviewService