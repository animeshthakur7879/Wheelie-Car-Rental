import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const authSice = createSlice(
    {
        name : 'auth' , 
        initialState : {
            user: JSON.parse(localStorage.getItem('user')) || null,
            isLoading : false , 
            isSuccess : false ,
            isError : false , 
            message : ""
        } , 
        reducers : {} , 
        extraReducers : (builder) => {

            builder
            .addCase(registerUser.pending , (state , action) => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = false
            })
            .addCase(registerUser.fulfilled , (state , action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.user =action.payload
                state.isError = false
            })
            .addCase(registerUser.rejected , (state , action) => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })

            .addCase(loginUser.pending , (state , action) => {
                state.isLoading = true
                state.isSuccess = false 
                state.isError = false
            })
            .addCase(loginUser.fulfilled , (state , action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.user =action.payload
                state.isError = false
            })
            .addCase(loginUser.rejected , (state , action) => {
                state.isLoading = false
                state.isSuccess = false 
                state.isError = true
                state.message = action.payload
            })
             // LOGOUT
             .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = "";
            });
            

        }
    }
)

export default authSice.reducer


//REGISTER USER 
export const registerUser = createAsyncThunk(
    "AUTH/REGISTER" , 
    async (formData , thunkAPI) => {
        try {

            return await authService.register(formData)
            
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)



//LOGIN USER 
export const loginUser = createAsyncThunk(
    "AUTH/LOGIN" , 
    async (formData , thunkAPI) => {
        try {

            return await authService.login(formData)
            
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Logout User
export const logoutUser = createAsyncThunk(
    "AUTH/LOGOUT",
    async (_, thunkAPI) => {
        try {
            await authService.logout();
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

