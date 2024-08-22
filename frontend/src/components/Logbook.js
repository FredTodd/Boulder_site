import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './Logbook.css';

const Logbook = () => {
  const [climbs, setClimbs] = useState([]);

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

  const countClimbsPerGrade = () => {
    const allGrades = [
      'VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7',
      'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'
    ];

    const gradeCounts = allGrades.reduce((acc, grade) => {
      acc[grade] = 0;
      return acc;
    }, {});

    climbs.forEach(climb => {
      gradeCounts[climb.grade] = (gradeCounts[climb.grade] || 0) + 1;
    });

    return gradeCounts;
  };

  const gradeCounts = countClimbsPerGrade();

  const data = {
    labels: Object.keys(gradeCounts),
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

  return (
    <div className="logbook-container">
      <div className="climbs-list">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Logbook;
