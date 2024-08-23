import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOutdoorClimb } from '../services/climbService';
import './LogClimb.css';

const LogOutdoorClimb = () => {
  const [location, setLocation] = useState('');
  const [routeName, setRouteName] = useState('');
  const [grade, setGrade] = useState(0); // Initialize as integer
  const [personalRating, setPersonalRating] = useState(5);
  const [notes, setNotes] = useState('');
  const maxChars = 200;
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const climbData = { 
      location, 
      route_name: routeName, 
      grade, // Already an integer
      personal_rating: personalRating, 
      notes, 
      climb_date: date 
    };
    try {
      await logOutdoorClimb(climbData);
      navigate('/profile');
    } catch (error) {
      console.error('Error logging outdoor climb:', error);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="log-climb-container">
      <div className="switch-links">
        <Link to="/log-indoor-climb" className="button inactive-button">Indoor</Link>
        <Link to="/log-outdoor-climb" className="button active-button">Outdoor</Link>
      </div>
      <h1>Log Outdoor Climb</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Route Name</label>
          <input 
            type="text" 
            value={routeName} 
            onChange={(e) => setRouteName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <select 
            value={grade} 
            onChange={(e) => setGrade(parseInt(e.target.value, 10))} // Convert to integer
            required
          >
            {/* Dropdown options for climbing grades */}
            {['VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'].map((g, index) => (
              <option key={g} value={index}>{g}</option> // Use index as value (integer)
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Personal Rating</label>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={personalRating} 
            onChange={(e) => setPersonalRating(e.target.value)} 
            required 
          />
          <span>{personalRating}</span>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea 
            id="notes"
            value={notes}
            onChange={handleNotesChange}
            maxLength={maxChars}
            rows="4"
            cols="50"
            required 
          />
          <p>{notes.length}/{maxChars} characters</p> {/* Displays character count */}
        </div>
        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="log-button">Log Climb</button>
      </form>
    </div>
  );
};

export default LogOutdoorClimb;
