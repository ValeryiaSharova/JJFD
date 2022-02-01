import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from '../usersListPage/usersList';
import User from '../userPage/user';
import UserProvider from '../../hooks/useUsers';

const Users = () => {
  const { userId } = useParams();

  return <UserProvider>{userId ? <User userId={userId} /> : <UsersList />}</UserProvider>;
};

export default Users;
