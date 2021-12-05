/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Phrase from './components/phrase';
import Table from './components/table';
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

  return (
    <>
      <Phrase users={users} phrase={phrase} />
      {users.length ? <Table users={users} handleDelete={handleDelete} /> : null}
    </>
  );
};

export default Users;
