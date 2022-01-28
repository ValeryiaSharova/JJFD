import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import UserCard from './components/userCard';
import QualitiesCard from './components/qualitiesCard';
import MeetingsCard from './components/meetingsCard';
import CommentsList from './components/commentsList';
import CommentForm from './components/commentForm';
import api from '../../api/index';

const User = ({ userId }) => {
  const [user, setUser] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    api.users.getById(userId).then(data => {
      setUser(data);
    });
    api.comments.fetchCommentsForUser(userId).then(data => {
      setComments(data);
    });
  }, []);

  const handleSubmit = data => {
    api.comments.add(data).then(newComment => {
      setComments([...comments, newComment]);
    });
  };

  const handleDelete = id => {
    api.comments.remove(id);
    setComments(prevState => prevState.filter(x => x._id !== id));
  };

  if (user && comments) {
    const sortedComments = orderBy(comments, ['created_at', ['desc']]);
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} userId={userId} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard meetings={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <CommentForm onSubmit={handleSubmit} pageId={userId} />
            {sortedComments.length !== 0 && (
              <CommentsList comments={sortedComments} handleDelete={handleDelete} />
            )}
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
