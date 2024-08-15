import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import LogIndoorClimb from './components/LogIndoorClimb';
import LogOutdoorClimb from './components/LogOutdoorClimb';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar'; // Import RightSidebar component
import './App.css';

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="/update-profile" element={<ProtectedRoute component={UpdateProfile} />} />
            <Route path="/log-climb" element={<ProtectedRoute component={LogIndoorClimb} />} />
            <Route path="/log-indoor-climb" element={<ProtectedRoute component={LogIndoorClimb} />} />
            <Route path="/log-outdoor-climb" element={<ProtectedRoute component={LogOutdoorClimb} />} />
          </Routes>
        </div>
        {/* Conditionally render RightSidebar only on the home page */}
        {location.pathname === '/' && <RightSidebar />}
      </div>
    </>
  );
};

export default App;
