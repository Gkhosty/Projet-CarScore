import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import CarDetails from './pages/CarDetails';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/add-car" element={
                    <ProtectedRoute><AddCar /></ProtectedRoute>
                } />
                <Route path="/car/:id" element={
                    <ProtectedRoute><CarDetails /></ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}