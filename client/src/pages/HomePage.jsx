import React, { useEffect } from 'react'
import Hero from '../components/ui/Hero'
import PopularCars from '../components/ui/PopularCars'
import About from '../components/ui/About'
import FeaturedDeals from '../components/ui/FeaturedDeals'
import Reviews from '../components/ui/Reviews'
import Footer from '../components/ui/Footer'
import { useDispatch, useSelector } from 'react-redux'
import CarsSection from '../components/ui/CarsSection'
import { getCars } from '../features/car/carSlice'

const HomePage = () => {

  const {user} = useSelector(state => state.auth)
  const {cars} = useSelector(state => state.car)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCars())
  } , [dispatch])

  return (
    <>


        {/* Hero Section */}

        <Hero/>

        {/* Popular Car Categories */}
        {/* <PopularCars/> */}

        {/* How It Works */}
        
        <CarsSection/>

        {/* Featured Deals */}
        {/* <FeaturedDeals/> */}

        {/* Testimonials */}
        {/* <Reviews/> */}


        {/* Footer */}
        <Footer/>
    </>
  )
}

export default HomePage
