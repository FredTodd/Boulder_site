import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import LogClimb from './components/LogClimb';
import LogIndoorClimb from './components/LogIndoorClimb'; // Import the LogIndoorClimb component
import LogOutdoorClimb from './components/LogOutdoorClimb'; // Import the LogOutdoorClimb component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/log-climb" element={<LogClimb />} /> {/* Add the route for LogClimb */}
      <Route path="/log-indoor-climb" element={<LogIndoorClimb />} /> {/* Add the route for LogIndoorClimb */}
      <Route path="/log-outdoor-climb" element={<LogOutdoorClimb />} /> {/* Add the route for LogOutdoorClimb */}
    </Routes>
  );
};

export default App;
