import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rentalService from "./rentalService";

const rentalSlice = createSlice({
    name : "rental" , 
    initialState : {
        rentals : [] , 
        rental : {} , 
        isLoading : false ,
        isSuccess : false , 
        isError : false ,
        message : ""

    } ,
    reducers : {} ,
    extraReducers : (builder) => {
        builder
        //FETCH RENTAL CASES(ADMIN)
        .addCase(getAdminRentals.pending , (state , action) => {
            state.isLoading = true , 
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(getAdminRentals.fulfilled , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = true , 
            state.rentals = action.payload
            state.isError = false
        })

        .addCase(getAdminRentals.rejected , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = false , 
            state.isError = true , 
            state.message = action.payload
        })
        //FETCH RENTAL CASES User
        .addCase(getUserRentals.pending , (state , action) => {
            state.isLoading = true , 
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(getUserRentals.fulfilled , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = true , 
            state.rentals = action.payload
            state.isError = false
        })

        .addCase(getUserRentals.rejected , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = false , 
            state.isError = true , 
            state.message = action.payload
        })
        //ADD RENTAL CASES(USER)
        .addCase(addUserRental.pending , (state , action) => {
            state.isLoading = true , 
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(addUserRental.fulfilled , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = true , 
            state.rental = action.payload
            state.isError = false
        })

        .addCase(addUserRental.rejected , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = false , 
            state.isError = true , 
            state.message = action.payload
        })
        //UPDATE RENTAL CASES(USER)
        .addCase(updateUserRental.pending , (state , action) => {
            state.isLoading = true , 
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(updateUserRental.fulfilled , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = true , 
            state.rentals = state.rentals.map((rental) => rental._id === action.payload._id ? action.payload : rental)
            state.isError = false
        })

        .addCase(updateUserRental.rejected , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = false , 
            state.isError = true , 
            state.message = action.payload
        })
        //REMOVE RENTAL CASES(USER)
        .addCase(removeRental.pending , (state , action) => {
            state.isLoading = true , 
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(removeRental.fulfilled , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = true , 
            state.rentals = state.rentals.filter((rental) => rental._id !== action.payload._id)
            state.isError = false
        })

        .addCase(removeRental.rejected , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = false , 
            state.isError = true , 
            state.message = action.payload
        })


    }
})

export default rentalSlice.reducer


//GET ALL RENTALS (ADMIN)

export const getAdminRentals = createAsyncThunk(
    "RENTLAS/GETRENTALS" , 
    async(_ , thunkAPI) => {

        let token = thunkAPI.getState().auth.user.token

        try {
             return await rentalService.getAdminRentals(token)
        } catch (error) {
            const message = error.response.data.message
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUserRentals = createAsyncThunk(
    "RENTAL/GETUSERENTALS" , 
    async (_ , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        try {
            return await rentalService.getUserRentals(token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

export const addUserRental = createAsyncThunk(
    "RENTALS/ADDRENTAL" , 
    async ({cid , formData} , thunkAPI) => {

        let token = thunkAPI.getState().auth.user.token
        try {
            return await rentalService.addUserRental(cid , formData , token)
        } catch (error) {
            const message = error.response.data.message
            console.log(message)
            thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateUserRental = createAsyncThunk(
    "RENTAL/UPDATERENTAL" ,
    async ({rid , formData} , thunkAPI) => {

        let token = thunkAPI.getState().auth.user.token

        try {
            return await rentalService.updateUserRental(rid , formData , token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }


    }
)

export const removeRental = createAsyncThunk(
    "RENTAL/REMOVERENTAL" , 
    async (rid , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token

        try {
            return await rentalService.deleteUserRental(rid , token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)