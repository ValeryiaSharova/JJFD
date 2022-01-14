import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UsersList from '../usersListPage/usersList';
import User from '../userPage/user';
import api from '../../api/index';

const Users = () => {
  const params = useParams();
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const { getById } = api.users;
  useEffect(() => {
    api.users.fetchAll().then(data => {
      setUsers(data);
    });
  }, []);
  useEffect(() => {
    api.professions.fetchAll().then(data => {
      setProfessions(data);
    });
  }, []);

  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId));
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
  const { userId } = params;
  if (users && professions) {
    return (
      <>
        {userId ? (
          <User userId={userId} getById={getById} />
        ) : (
          <UsersList
            users={users}
            professions={professions}
            handleDelete={handleDelete}
            handleToggleBookmark={handleToggleBookmark}
          />
        )}
      </>
    );
  }
  return <h1>Загрузка...</h1>;
};

export default Users;
