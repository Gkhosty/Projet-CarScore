import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import CarDetails from './pages/CarDetails';
import AdminDashboard from './pages/AdminDashboard';


export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        </BrowserRouter>
    );
}