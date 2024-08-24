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
import Logbook from './components/Logbook';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Friends from './components/Friends';
import FriendProfile from './components/FriendProfile'; // Component to display the profile of a friend
import '@fontsource/rock-salt';
import './App.css';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="main-content">
        {location.pathname !== '/login' && location.pathname !== '/register' && <Sidebar />}
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
            <Route path="/logbook" element={<ProtectedRoute component={Logbook} />} />
            <Route path="/friends" element={<ProtectedRoute component={Friends} />} />
            <Route path="/user-profile/:userId" element={<ProtectedRoute component={FriendProfile} />} /> {/* Correct route for user profiles */}
          </Routes>
        </div>
        {location.pathname === '/' && <RightSidebar />}
      </div>
    </>
  );
};

export default App;
