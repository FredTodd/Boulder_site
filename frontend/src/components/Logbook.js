import React from 'react';
import LogbookComponent from './LogbookFeature';
import './Logbook.css';

const Logbook = () => {
  return (
    <LogbookComponent fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/auth/climbs`} />
  );
};

export default Logbook;
