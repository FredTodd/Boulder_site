import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logIndoorClimb } from '../services/climbService'; // Assuming you have a service for API calls
import './LogClimb.css';

const LogIndoorClimb = () => {
  const [location, setLocation] = useState('');
  const [grade, setGrade] = useState('');
  const [personalRating, setPersonalRating] = useState(5); // Default value to 5
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await logIndoorClimb({ location, grade, personalRating, notes, date });
      navigate('/profile'); // Redirect after successful submission
    } catch (error) {
      console.error('Error logging indoor climb:', error);
    }
  };

  return (
    <div className="log-climb-container">
      <div className="switch-links">
        <Link to="/log-indoor-climb" className="switch-link active">Indoor</Link>
        <Link to="/log-outdoor-climb" className="switch-link">Outdoor</Link>
      </div>
      <h1>Log Indoor Climb</h1>
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
          <label>Grade</label>
          <input 
            type="text" 
            value={grade} 
            onChange={(e) => setGrade(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Personal Rating</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={personalRating} 
            onChange={(e) => setPersonalRating(e.target.value)} 
            required 
          />
          <span>{personalRating}</span>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            required 
          />
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

export default LogIndoorClimb;
