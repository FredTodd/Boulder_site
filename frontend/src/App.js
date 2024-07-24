import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import LogClimb from './components/LogClimb';
import LogIndoorClimb from './components/LogIndoorClimb';
import LogOutdoorClimb from './components/LogOutdoorClimb';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Import Navbar

const App = () => {
  return (
    <>
      <Navbar /> {/* Ensure Navbar is included only here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/update-profile" element={<ProtectedRoute component={UpdateProfile} />} />
        <Route path="/log-climb" element={<ProtectedRoute component={LogClimb} />} />
        <Route path="/log-indoor-climb" element={<ProtectedRoute component={LogIndoorClimb} />} />
        <Route path="/log-outdoor-climb" element={<ProtectedRoute component={LogOutdoorClimb} />} />
      </Routes>
    </>
  );
};

export default App;
