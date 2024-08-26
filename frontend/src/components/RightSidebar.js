import React from 'react';
import './RightSidebar.css';

const RightSidebar = () => {
  // Array of objects representing the women's Olympic standings
  const olympicStandingsWomen = [
    { place: '', name: 'GARNBRET Janja', country: 'SLO', points: 168.5, medal: 'Gold' },
    { place: '', name: 'RABOUTOU Brooke', country: 'USA', points: 156.0, medal: 'Silver' },
    { place: '', name: 'PILZ Jessica', country: 'AUT', points: 147.4, medal: 'Bronze' },
    //{ place: 4, name: 'MORI Ai', country: 'JPN', points: 135.1, medal: '' },
    //{ place: 5, name: 'McNEICE Erin', country: 'GBR', points: 127.6, medal: '' },
    //{ place: 6, name: 'SEO Chaehyun', country: 'KOR', points: 105.0, medal: '' },
    //{ place: 7, name: 'MACKENZIE Oceania', country: 'AUS', points: 104.8, medal: '' },
    //{ place: 8, name: 'BERTONE Oriane', country: 'FRA', points: 104.5, medal: '' },
  ];
  
  // Array of objects representing the men's Olympic standings
  const olympicStandingsMen = [
    { place: '', name: 'ROBERTS Toby', country: 'GBR', points: 155.2, medal: 'Gold' },
    { place: '', name: 'ANRAKU Sorato', country: 'JPN', points: 145.4, medal: 'Silver' },
    { place: '', name: 'SCHUBERT Jakob', country: 'AUT', points: 139.6, medal: 'Bronze' },
    //{ place: 4, name: 'DUFFY Colin', country: 'USA', points: 136.4, medal: '' },
    //{ place: 5, name: 'McARTHUR Hamish', country: 'GBR', points: 125.9, medal: '' },
    //{ place: 6, name: 'ONDRA Adam', country: 'CZE', points: 120.1, medal: '' },
    //{ place: 7, name: 'GINES LOPEX Alberto', country: 'ESP', points: 116.2, medal: '' },
    //{ place: 8, name: 'JENFT Paul', country: 'FRA', points: 78.4, medal: '' },
  ];

  return (
    <div className="right-sidebar">
      <div className="right-sidebar-content">
        <h2>Olympic Standings Womens</h2>
        <ul className="olympic-standings-list">
          {/* Map over the women's standings array to render each standing */}
          {olympicStandingsWomen.map((standing) => (
            <li key={standing.name}> {/* Use unique key based on athlete name */}
              {standing.place}{standing.medal} - {standing.name}, {standing.country} ({standing.points} points)
            </li>
          ))}
        </ul>
        <h2>Olympic Standings Mens</h2>
        <ul className="olympic-standings-list">
          {olympicStandingsMen.map((standing) => (
            <li key={standing.name}>
              {standing.place}{standing.medal} - {standing.name}, {standing.country} ({standing.points} points)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
