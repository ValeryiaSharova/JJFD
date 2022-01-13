import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ users, setUsers }) => {
  const handleSearch = ({ target }) => {
    console.log(target.value);
    console.log(users);
    const foundUsers = [];
    if (target.value === '') {
      setUsers(users);
      return;
    }
    users.forEach(user => {
      if (user.name.toLowerCase().includes(target.value.toLowerCase())) {
        foundUsers.push(user);
      }
    });
    setUsers(foundUsers);
  };
  return (
    <input
      type="text"
      className="form-control mt-2"
      placeholder="Поиск..."
      onChange={handleSearch}
    />
  );
};

Search.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default Search;
