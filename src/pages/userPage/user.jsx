import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Qualities from '../../sharedComponents/qualities';

const User = ({ userId, getById }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    getById(userId).then(data => {
      setUser(data);
    }, []);
  }, [getById, userId]);
  if (user) {
    return (
      <div className="mx-4">
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <Qualities qualities={user.qualities} />
        <p>Встретился раз: {user.completedMeetings}</p>
        <h3>Оценка: {user.rate}</h3>
        <Link type="button" className="btn btn-dark" to={`/users/${userId}/edit`}>
          Изменить
        </Link>
      </div>
    );
  }
  return <h1>Загрузка...</h1>;
};

User.propTypes = {
  userId: PropTypes.string.isRequired,
  getById: PropTypes.func.isRequired,
};

export default User;
