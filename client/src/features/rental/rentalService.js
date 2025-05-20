import axios from "axios"

const getAdminRentals = async(token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    
    const response = await axios.get("/api/admin/rentals" , options)
    return(response.data) 
}

export const getUserRentals = async(token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get("/api/rentals" , options)
    return response.data
}

const addUserRental = async(cid , formData , token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(`/api/rentals/${cid}` , formData , options)
    return response.data

}

const updateUserRental = async(rid , formData , token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.put(`/api/rentals/${rid}` , formData , options)
    return response.data
}
const deleteUserRental = async(rid , token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.delete(`/api/rentals/${rid}` , options)
    return response.data

}

const rentalService = {getAdminRentals , addUserRental , getUserRentals ,updateUserRental , deleteUserRental}


export default rentalService