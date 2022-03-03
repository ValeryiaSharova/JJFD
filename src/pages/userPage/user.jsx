import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import UserCard from './components/userCard';
import QualitiesCard from './components/qualitiesCard';
import MeetingsCard from './components/meetingsCard';
import Comments from './components/comments';
import { getUserById } from '../../store/users';

const User = ({ userId }) => {
  const user = useSelector(getUserById(userId));

  if (user) {
    return (
      <div className="container mt-4">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualitiesId={user.qualities} />
            <MeetingsCard meetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    );
  }
  return <h1>Загрузка...</h1>;
};

User.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default User;
