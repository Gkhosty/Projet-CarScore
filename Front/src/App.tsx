import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import CarDetails from './pages/CarDetails';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { ProtectedRouteAdmin, ProtectedRouteUser} from './components/ProtectedRoute';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify/:token" element={<Verify />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
                <Route path="/dashboard" element={
                    <ProtectedRouteUser><Dashboard /></ProtectedRouteUser>
                } />
                <Route path="/add-car" element={
                    <ProtectedRouteUser><AddCar /></ProtectedRouteUser>
                } />
                <Route path="/car/:id" element={
                    <ProtectedRouteUser><CarDetails /></ProtectedRouteUser>
                } />
                <Route path="/admin" element={
                    <ProtectedRouteAdmin><AdminDashboard /></ProtectedRouteAdmin>
                } />
            </Routes>
        </BrowserRouter>
    );
}