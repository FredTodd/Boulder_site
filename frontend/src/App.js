import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedPage from './components/ProtectedPage';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SuccessfullyRegistered from './components/SuccessfullyRegistered';

function App() {
  const getToken = () => localStorage.getItem('token');

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/successfully-registered" element={<SuccessfullyRegistered />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/protected" element={<ProtectedRoute component={ProtectedPage} />} />
        <Route
          path="*"
          element={
            getToken() ? <Navigate to="/profile" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
