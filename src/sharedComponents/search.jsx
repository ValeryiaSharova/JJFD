import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchValue, handleSearch }) => {
  return (
    <input
      type="text"
      className="form-control mt-2"
      placeholder="Поиск..."
      value={searchValue}
      onChange={handleSearch}
    />
  );
};

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
