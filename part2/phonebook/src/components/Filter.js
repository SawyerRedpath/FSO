import React from 'react';

const Filter = ({ newSearch, handleNewSearchChange }) => {
  return (
    <div>
      <span>search for contact </span>{' '}
      <input value={newSearch} onChange={handleNewSearchChange} />
    </div>
  );
};

export default Filter;
