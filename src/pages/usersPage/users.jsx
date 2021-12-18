/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import TableOfUsers from './components/tableOfUsers';
import api from '../../api/index';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id));
  };

  const handleToggleBookmark = id => {
    const updateUsers = users.map(user => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(updateUsers);
  };

  return (
    <>
      {users.length ? (
        <TableOfUsers
          users={users}
          handleDelete={handleDelete}
          handleToggleBookmark={handleToggleBookmark}
        />
      ) : null}
    </>
  );
};

export default Users;
