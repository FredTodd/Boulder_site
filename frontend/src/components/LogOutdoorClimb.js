import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logOutdoorClimb } from '../services/climbService';
import './LogClimb.css';

const allGrades = [
  'VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7',
  'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'
];

const LogOutdoorClimb = () => {
  const [location, setLocation] = useState(''); // State for location input
  const [routeName, setRouteName] = useState(''); // State for route name input
  const [grade, setGrade] = useState(0); // State for grade input, initialized as 0 for 'VB'
  const [personalRating, setPersonalRating] = useState(5); // State for personal rating input
  const [notes, setNotes] = useState(''); // State for notes input
  const maxChars = 200; // Maximum character limit for notes
  const [date, setDate] = useState(''); // State for date input
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const climbData = { 
      location, 
      route_name: routeName, 
      grade, // Grade is already an integer
      personal_rating: personalRating, 
      notes, 
      climb_date: date 
    };
    try {
      await logOutdoorClimb(climbData); // Log the outdoor climb using the provided function
      navigate('/profile'); // Navigate to the user's profile upon successful logging
    } catch (error) {
      console.error('Error logging outdoor climb:', error); // Log any errors
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value); // Update notes state with the input value
  };

  return (
    <div className="log-climb-container">
      <div className="switch-links">
        {/* Navigation links for switching between indoor and outdoor climb logging */}
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
            onChange={(e) => setGrade(parseInt(e.target.value, 10))} // Convert selected value to an integer
            required
          >
            {allGrades.map((g, index) => (
              <option key={g} value={index}>{g}</option> // Map each grade to an option
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Personal Rating</label>
          {/* Input for selecting personal rating, displayed as a range slider */}
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={personalRating} 
            onChange={(e) => setPersonalRating(e.target.value)} 
            required 
          />
          <span>{personalRating}</span> {/* Display the selected personal rating */}
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea 
            id="notes"
            value={notes}
            onChange={handleNotesChange}
            maxLength={maxChars} // Limit the maximum characters allowed in the textarea
            rows="4"
            cols="50"
            required 
          />
          <p>{notes.length}/{maxChars} characters</p> {/* Display character count for notes */}
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
        <button type="submit" className="log-button">Log Climb</button> {/* Submit button for the form */}
      </form>
    </div>
  );
};

export default LogOutdoorClimb;
