import axios from 'axios'

//GET ALL CARS
const getCars = async() => {
    const response = await axios.get("https://wheelie-backend.onrender.com/api/car")
    return response.data
}

//GET CAR 
const getCar = async (cid) => {
    const response = await axios.get(`/api/car/${cid}`)
    return response.data
}

//ADD A CAR(ADMIN)
const addCar = async (formData , token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post("/api/admin/car" , formData , options)
    return response.data
}

//UPDATE CAR(ADMIN)
const updateCar = async(id ,formData , token) => {
    
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.put("/api/admin/car/"+id , formData , options)
    return response.data


}

//REMOVE CAR(ADMIN)
const removeCar = async(id , token) => {
    
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.delete("/api/admin/car/"+id , options)
    return response.data


}

const carService = {getCars ,addCar ,updateCar , removeCar , getCar}

export default carService