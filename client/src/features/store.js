import {configureStore} from '@reduxjs/toolkit'
import auth from './auth/authSlice'
import car from './car/carSlice'
import rental from './rental/rentalSlice'
import review from './review/reviewSlice'


const store = configureStore(
    {
        reducer : {auth , car , rental , review }
    }
)

export default store