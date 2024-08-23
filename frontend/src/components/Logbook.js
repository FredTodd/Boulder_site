import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './Logbook.css';

// Declare the gradeMapping object first
const gradeMapping = {
  0: 'VB',
  1: 'V0',
  2: 'V1',
  3: 'V2',
  4: 'V3',
  5: 'V4',
  6: 'V5',
  7: 'V6',
  8: 'V7',
  9: 'V8',
  10: 'V9',
  11: 'V10',
  12: 'V11',
  13: 'V12',
  14: 'V13',
  15: 'V14',
  16: 'V15',
  17: 'V16',
  18: 'V17'
};

const Logbook = () => {
  const [climbs, setClimbs] = useState([]);
  const [chartFilter, setChartFilter] = useState('both'); // 'both', 'indoor', 'outdoor'
  const [sortOption, setSortOption] = useState('grade-asc'); // Default sort option

  useEffect(() => {
    const fetchClimbs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/climbs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setClimbs(data);
      } catch (error) {
        console.error('Error fetching climbs:', error);
      }
    };

    fetchClimbs();
  }, []);

  const filterClimbsForChart = () => {
    if (chartFilter === 'both') {
      return climbs;
    }
    return climbs.filter(climb => climb.type === chartFilter);
  };

  const countClimbsPerGrade = () => {
    const allGrades = [
      'VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7',
      'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'
    ];

    const gradeCounts = allGrades.reduce((acc, grade) => {
      acc[grade] = 0;
      return acc;
    }, {});
  
    filterClimbsForChart().forEach(climb => {
      const gradeLabel = gradeMapping[climb.grade]; // Map the integer to the corresponding "V" grade
      gradeCounts[gradeLabel] = (gradeCounts[gradeLabel] || 0) + 1;
    });
  
    return gradeCounts;
  };

  const gradeCounts = countClimbsPerGrade();

  const data = {
    labels: Object.keys(gradeCounts), // This will now use the "V" prefixed labels
    datasets: [
      {
        label: 'Number of Climbs',
        data: Object.values(gradeCounts),
        backgroundColor: '#567934', // Green color
      },
    ],
  };
  
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Ensure Y-axis starts at 0
        max: 50, // Force Y-axis to display up to 50
        ticks: {
          stepSize: 5, // Optional: Set the step size for ticks
        },
      },
    },
  };

  const sortClimbs = (climbs) => {
    return climbs.sort((a, b) => {
      if (sortOption === 'grade-asc') {
        return a.grade - b.grade; // Use numerical comparison
      } else if (sortOption === 'grade-desc') {
        return b.grade - a.grade; // Use numerical comparison
      } else if (sortOption === 'date-asc') {
        return new Date(a.climb_date) - new Date(b.climb_date);
      } else if (sortOption === 'date-desc') {
        return new Date(b.climb_date) - new Date(a.climb_date);
      }
      return 0;
    });
  };

  return (
    <div className="logbook-page">
      {/* Container for the chart */}
      <div className="chart-container">
        <div className="filter-buttons">
          <button onClick={() => setChartFilter('both')}>Both</button>
          <button onClick={() => setChartFilter('indoor')}>Indoor</button>
          <button onClick={() => setChartFilter('outdoor')}>Outdoor</button>
        </div>
        <div className="chart">
          <Bar data={data} options={options} />
        </div>
      </div>

      {/* Container for the climb list with sort dropdown */}
      <div className="sort-dropdown">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="grade-asc">Grade (Low to High)</option>
          <option value="grade-desc">Grade (High to Low)</option>
          <option value="date-asc">Date (Oldest to Newest)</option>
          <option value="date-desc">Date (Newest to Oldest)</option>
        </select>
      </div>

      <div className="details-container">
        {sortClimbs(climbs).map((climb, index) => (
          <div key={index} className="climb-item">
            <div className="grade">
              <h1>{gradeMapping[climb.grade]}</h1> {/* Display the "V" grade */}
            </div>
            <div className="details">
              <h2><b>{climb.route_name}</b></h2>
              <p>Location: {climb.location}</p>
              <p>Date: {new Date(climb.climb_date).toLocaleDateString()}</p>
              <p>{climb.type}</p>
            </div>
            <div className="notes">
              <p>{climb.notes}</p>
            </div>
            <div className="rating">
              <p>{Array(climb.personal_rating).fill('⭐').join('')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logbook;
