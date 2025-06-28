import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/Register';
import Navbar from './components/ui/Navbar';
import LoginPage from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import CarBookingPage from './pages/CarBookingPage';
import MyRentals from './pages/MyRentals';
import SearchResults from './pages/SearchResults';
import MyProfile from './pages/MyProfile';
import AdminRoute from './components/AdminRoutes';

// Move this inner logic to a wrapper component
const AppWrapper = () => {
  const location = useLocation();

  // Check if the current route is '/admin'
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="*" element={<AdminDashboard />} />
          </Route>
          {/* <Route path="/admin/car" element={<CarManage />} />
          <Route path="/admin/rentals" element={<RentalManage />} />
          <Route path="/admin/reviews" element={<ReviewManage />} />
          <Route path="/admin/settings" element={<Settings />} /> */}
          <Route path="/car/:cid" element={<CarBookingPage/>} />
          <Route path="/profile/rentals" element={<MyRentals/>} />
          <Route path="/profile/edit" element={<MyProfile/>} />
          <Route path="/search/result" element={<SearchResults/>} />


        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
