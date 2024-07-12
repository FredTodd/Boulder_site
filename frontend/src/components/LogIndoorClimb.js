import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const LogIndoorClimb = () => {
  const [location, setLocation] = useState('');
  const [grade, setGrade] = useState('');
  const [personalRating, setPersonalRating] = useState('');
  const [notes, setNotes] = useState('');
  const [climbDate, setClimbDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/climbs/indoor`, { location, grade, personal_rating: personalRating, notes, climb_date: climbDate }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLocation('');
      setGrade('');
      setPersonalRating('');
      setNotes('');
      setClimbDate('');
      setError('');
      setSuccess('Indoor climb logged successfully!');
    } catch (error) {
      setError('Error logging indoor climb');
      setSuccess('');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Log Indoor Climb</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Grade:</label>
          <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        </div>
        <div>
          <label>Personal Rating:</label>
          <input type="number" value={personalRating} onChange={(e) => setPersonalRating(e.target.value)} required />
        </div>
        <div>
          <label>Notes:</label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={climbDate} onChange={(e) => setClimbDate(e.target.value)} required />
        </div>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <button type="submit">Log Indoor Climb</button>
      </form>
    </div>
  );
};

export default LogIndoorClimb;
