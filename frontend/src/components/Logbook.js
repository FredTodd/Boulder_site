import React from 'react';
import LogbookComponent from './LogbookFeature';

const Logbook = () => {
  return (
    // Render the LogbookComponent and pass the fetchClimbsUrl prop with the endpoint to fetch climbs data
    <LogbookComponent fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/auth/climbs`} />
  );
};

export default Logbook;
