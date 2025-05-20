import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "./carService";

const carSlice = createSlice(
    {
        name : 'car' ,
        initialState : {
            cars : [],
            car : {} , 
            isLoading : false , 
            isSuccess : false , 
            isError : false , 
            message : ""
        } , 
        reducers : {} , 
        extraReducers : (builder) => {

            builder
            //GET ALL CARS
            .addCase(getCars.pending , (state ,action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(getCars.fulfilled , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.cars = action.payload
                state.isError = false
            })
            .addCase(getCars.rejected , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                state.message = action.payload
            })//GET SINGLE CARS
            .addCase(getCar.pending , (state ,action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(getCar.fulfilled , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.car = action.payload
                state.isError = false
            })
            .addCase(getCar.rejected , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                state.message = action.payload
            })
            //ADD-CAR CASES
            .addCase(addCar.pending , (state ,action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(addCar.fulfilled , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.cars = [...state.cars , action.payload]
                state.isError = false
            })
            .addCase(addCar.rejected , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                state.message = action.payload 
            })
            //UPDATE-CAR CASES
            .addCase(updateCar.pending , (state ,action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(updateCar.fulfilled , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.cars = state.cars.map((car) => car._id === action.payload._id ? action.payload : car)
                state.isError = false
            })
            .addCase(updateCar.rejected , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                state.message = action.payload 
            })
            //REMOVE-CAR CASES
            .addCase(removeCar.pending , (state ,action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(removeCar.fulfilled , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.cars = state.cars.filter((car) => car._id !==  action.payload._id)
                state.isError = false
            })
            .addCase(removeCar.rejected , (state ,action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                state.message = action.payload 
            })


        } 
    }
)

export default carSlice.reducer


//GET ALL CARS 
export const getCars = createAsyncThunk(
    "CAR/GETCARS" , 
    async(thunkAPI) => {
        try {
            return await carService.getCars()
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//GET SINGLE CAR
export const getCar = createAsyncThunk(
    "CAR/GETCAR" , 
    async (cid , thunkAPI) => {
        try {
            return await carService.getCar(cid)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

//ADD CAR 
export const addCar = createAsyncThunk(
    "CAR/ADDCAR" , 
    async (formData , thunkAPI) => {

        let token = thunkAPI.getState().auth.user.token


        try {
            return await carService.addCar(formData , token)
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//CAR UPDATE (ADMIN)
export const updateCar = createAsyncThunk(
    "CAR/UPDATECAR" , 
    async ({id , formData} , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token

        try {
            return await carService.updateCar(id , formData , token)
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }

)

//REMOVE CAR(ADMIN  )
export const removeCar = createAsyncThunk(
    "CAR/REMOVECAR" , 
    async (id , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token

        try {
            return await carService.removeCar(id ,  token)
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }

)