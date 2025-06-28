// components/AdminRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {

    const {user} = useSelector(state => state.auth)

 

  const isAdmin = user && user.isAdmin === "admin"; // adjust based on your app's logic

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
