/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Phrase from './components/phrase';
import TableOfUsers from './components/tableOfUsers';
import api from '../../api/index';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [phrase, setPhrase] = useState(`${users.length} человек тусанет с тобой сегодня`);

  const renderPhrase = num => {
    const number = num - 1;
    if (number === 1 || number >= 5) {
      setPhrase(`${number} человек тусанет с тобой сегодня`);
    } else if (number >= 2 && number <= 4) {
      setPhrase(`${number} человека тусанут с тобой сегодня`);
    } else {
      setPhrase('Никто с тобой не тусанет');
    }
  };

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id));
    renderPhrase(users.length);
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
      <Phrase users={users} phrase={phrase} />
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
