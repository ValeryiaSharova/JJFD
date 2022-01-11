import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Qualities from '../../sharedComponents/qualities';

const User = ({ userId, getById }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    getById(userId).then(data => {
      setUser(data);
    });
  }, [getById, userId]);
  const handleReturn = () => {
    history.push('/users');
  };
  if (user) {
    return (
      <div className="mx-4">
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <Qualities qualities={user.qualities} />
        <p>Встретился раз: {user.completedMeetings}</p>
        <h3>Оценка: {user.rate}</h3>
        <button
          type="button"
          onClick={() => {
            handleReturn();
          }}
        >
          Все пользователи
        </button>
      </div>
    );
  }
  return <h1>Loading</h1>;
};

User.propTypes = {
  userId: PropTypes.string.isRequired,
  getById: PropTypes.func.isRequired,
};

export default User;
