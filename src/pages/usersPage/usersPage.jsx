import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from '../usersListPage/usersList';
import User from '../userPage/user';
import UsersLoader from '../../components/hoc/usersLoader';

const Users = () => {
  const { userId } = useParams();
  return <UsersLoader>{userId ? <User userId={userId} /> : <UsersList />}</UsersLoader>;
};

export default Users;
