import  { createContext, useState } from "react";
import React from 'react'

export const FilteredCarsContext = createContext() ; 

export const FilteredCarsProvider = ({children}) => {

    const [filteredCars, setFilteredCars] = useState([]);

    return(
        <FilteredCarsContext.Provider value={{ filteredCars, setFilteredCars }}>
            {children}
        </FilteredCarsContext.Provider>
    )

}