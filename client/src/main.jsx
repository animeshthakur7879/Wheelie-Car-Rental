import {  StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './features/store.js';
import { FilteredCarsProvider } from './context/FilteredCarsContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <FilteredCarsProvider>

          <App />
      </FilteredCarsProvider>
    </Provider>
    <ToastContainer/>
  </StrictMode>,
)
