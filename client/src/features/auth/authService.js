import API from '../../../axios'


const register = async(formData) => {

    const response = await API.post("/api/auth/register" , formData)
    localStorage.setItem('user' , JSON.stringify(response.data))
    return response.data
}

const login = async(formData) => {

    const response = await API.post("/api/auth/login" , formData)
    localStorage.setItem('user' , JSON.stringify(response.data))
    return response.data
}
// LOGOUT
const logout = async () => {
    localStorage.removeItem('user');
};

const authService = {register , login , logout}

export default authService