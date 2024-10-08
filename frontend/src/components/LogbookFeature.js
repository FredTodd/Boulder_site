import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './LogbookFeature.css';

const LogbookFeature = ({ fetchClimbsUrl }) => {
  const [climbs, setClimbs] = useState([]);
  const [chartFilter, setChartFilter] = useState('both');
  const [sortOption, setSortOption] = useState('grade-asc');

  const allGrades = [
    'VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7',
    'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'
  ];

  // Convert integer grade to string grade, 'VB' for 0, others use allGrades array
  const intToGrade = (int) => {
    return int === 0 ? 'VB' : allGrades[int];
  };

  useEffect(() => {
    const fetchClimbs = async () => {
      try {
        const response = await fetch(fetchClimbsUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setClimbs(data); // Update climbs state with fetched data
      } catch (error) {
        console.error('Error fetching climbs:', error);
      }
    };
  
    fetchClimbs(); // Fetch climbs when component mounts or fetchClimbsUrl changes
  }, [fetchClimbsUrl]);
  

  // Filter climbs based on selected chart filter
  const filterClimbsForChart = () => {
    if (chartFilter === 'both') {
      return climbs; // Return all climbs if filter is set to 'both'
    }
    return climbs.filter(climb => climb.type === chartFilter); // Filter climbs by type
  };

  // Count the number of climbs per grade
  const countClimbsPerGrade = () => {
    const gradeCounts = allGrades.reduce((acc, grade) => {
      acc[grade] = 0; // Initialize each grade with a count of 0
      return acc;
    }, {});

    filterClimbsForChart().forEach(climb => {
      const gradeLabel = intToGrade(climb.grade) || 'Unknown'; // Convert grade to label or use 'Unknown'
      gradeCounts[gradeLabel] = (gradeCounts[gradeLabel] || 0) + 1; // Increment the count for the grade
    });

    return gradeCounts;
  };

  const gradeCounts = countClimbsPerGrade(); // Calculate grade counts for chart data

  const data = {
    labels: Object.keys(gradeCounts), // Chart labels are the grades
    datasets: [
      {
        label: 'Number of Climbs',
        data: Object.values(gradeCounts), // Chart data are the counts of climbs per grade
        backgroundColor: '#567934', // Green color
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 50,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  // Sort climbs based on selected sort option
  const sortClimbs = (climbs) => {
    return climbs.sort((a, b) => {
      if (sortOption.startsWith('grade')) {
        // Sort by grade, ascending or descending
        return sortOption.endsWith('asc') ? a.grade - b.grade : b.grade - a.grade;
      } else if (sortOption.startsWith('date')) {
        // Sort by date, ascending or descending
        return sortOption.endsWith('asc') ? new Date(a.climb_date) - new Date(b.climb_date) : new Date(b.climb_date) - new Date(a.climb_date);
      }
      return 0;
    });
  };
  
  return (
    <div className="logbook-page">
      <div className="chart-container">
        <div className="filter-buttons">
          <button onClick={() => setChartFilter('both')}>Both</button>
          <button onClick={() => setChartFilter('indoor')}>Indoor</button>
          <button onClick={() => setChartFilter('outdoor')}>Outdoor</button>
        </div>
        <div className="chart">
          <Bar data={data} options={options} /> {/* Render bar chart using data and options */}
        </div>
      </div>
  
      <div className="sort-dropdown">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="date-desc">Date (Newest to Oldest)</option>
          <option value="date-asc">Date (Oldest to Newest)</option>
          <option value="grade-desc">Grade (High to Low)</option>
          <option value="grade-asc">Grade (Low to High)</option>
        </select>
      </div>
  
      <div className="details-container">
        {sortClimbs(climbs).map((climb, index) => (
          <div key={index} className="climb-item">
            <div className="grade">
              <h1>{intToGrade(climb.grade)}</h1> {/* Convert integer back to grade string */}
            </div>
            <div className="details">
              <h2><b>{climb.route_name}</b></h2>
              <p>Location: {climb.location}</p>
              <p>Date: {new Date(climb.climb_date).toLocaleDateString()}</p>
              <p>{climb.type}</p>
            </div>
            <div className="notes">
              <p2>{climb.notes}</p2>
            </div>
            <div className="rating">
              <p>{Array(climb.personal_rating).fill('⭐').join('')}</p> {/* Generate star rating */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};  

export default LogbookFeature;
