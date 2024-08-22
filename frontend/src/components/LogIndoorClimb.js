import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logIndoorClimb } from '../services/climbService';
import './LogClimb.css';

const LogIndoorClimb = () => {
  const [location, setLocation] = useState('');
  const [grade, setGrade] = useState('VB');
  const [personalRating, setPersonalRating] = useState(5);
  const [notes, setNotes] = useState('');
  const maxChars = 200;
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const climbData = { location, grade, personal_rating: personalRating, notes, climb_date: date };
    try {
      await logIndoorClimb(climbData);
      navigate('/profile');
    } catch (error) {
      console.error('Error logging indoor climb:', error);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="log-climb-container">
      <div className="switch-links">
        <Link to="/log-indoor-climb" className="button active-button">Indoor</Link>
        <Link to="/log-outdoor-climb" className="button inactive-button">Outdoor</Link>
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
          <select 
            value={grade} 
            onChange={(e) => setGrade(e.target.value)} 
            required
          >
            {/* Dropdown options for climbing grades */}
            {['VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'].map((g) => (
              <option key={g} value={g}>{g}</option>
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

export default LogIndoorClimb;
