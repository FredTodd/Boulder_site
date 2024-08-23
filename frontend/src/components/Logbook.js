import React from 'react';
import LogbookComponent from './LogbookFeature';

const Logbook = () => {
  return (
    <LogbookComponent fetchClimbsUrl={`${process.env.REACT_APP_API_URL}/auth/climbs`} />
  );
};

export default Logbook;
