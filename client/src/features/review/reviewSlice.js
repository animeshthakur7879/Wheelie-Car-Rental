import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const reviewSlice = createSlice({
    name : "review" , 
    initialState : {
        reviews : [] , 
        review : {} , 
        isLoading : false ,
        isSuccess : false , 
        isError : false
    } ,
    reducers : {} , 
    extraReducers : (builder) => {

        builder
        //GET ADMIN REVIEWS
        .addCase(getAdminReviews.pending , (state , action) => {
            state.isLoading = true ,
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(getAdminReviews.fulfilled , (state , action) => {
            state.isLoading = false ,
            state.isSuccess = true ,
            state.reviews = action.payload 
            state.isError = false
        })
        .addCase(getAdminReviews.rejected , (state , action) => {
            state.isLoading = false ,
            state.isSuccess = false , 
            state.isError = true ,
            state.message = action.payload
        })
        //GET CAR REVIEWS
        .addCase(getCarReviews.pending , (state , action) => {
            state.isLoading = true ,
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(getCarReviews.fulfilled , (state , action) => {
            state.isLoading = false ,
            state.isSuccess = true ,
            state.reviews = action.payload 
            state.isError = false
        })
        .addCase(getCarReviews.rejected , (state , action) => {
            state.isLoading = false ,
            state.isSuccess = false , 
            state.isError = true ,
            state.message = action.payload
        })
        //Add CAR REVIEWS
        .addCase(addUserReview.pending , (state , action) => {
            state.isLoading = true ,
            state.isSuccess = false , 
            state.isError = false
        })
        .addCase(addUserReview.fulfilled , (state , action) => {
            state.isLoading = false ,
            state.isSuccess = true ,
            state.reviews = [action.payload , ...state.reviews]
            state.isError = false
        })
        .addCase(addUserReview.rejected , (state , action) => {
            state.isLoading = false ,
            state.isSuccess = false , 
            state.isError = true ,
            state.message = action.payload
        })


    }
})

export default reviewSlice.reducer

//GET ALL REVIEWS (ADMIN)
export const getAdminReviews = createAsyncThunk(
    "REVIEW/ADMINGETALL" , 
    async(_ , thunkAPI) => {

        let token = thunkAPI.getState().auth.user.token
        try {
            return await reviewService.getAllReview(token)
        } catch (error) {
            const message = error.response.data.message
            console.log(message)
            thunkAPI.rejectWithValue(message)
        }


    }
)

//GET ALL REVIEWS OF SINGLE CAR
export const getCarReviews = createAsyncThunk(
    "REVIEW/CARREVIEWS" , 
    async (cid , thunkAPI) => {

        let token = thunkAPI.getState().auth.user.token

        try {
            return await reviewService.fetchCarReviews(cid , token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

//ADD USER REVIEW 
export const addUserReview = createAsyncThunk(
    "REVIEW/ADDREVIEW" ,
    async ({cid ,  reviewData} , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        console.log(cid)
        console.log(reviewData)

        try {
            return await reviewService.addUserReview(cid , reviewData , token)
        } catch (error) {
            const message = error.response.data.message
            console.log(message)
            thunkAPI.rejectWithValue(message)
        }

    }
)