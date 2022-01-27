import React from 'react';
import PropTypes from 'prop-types';
import CommentCard from './сommentCard';

const CommentsList = ({ comments, handleDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Коментарии</h2>
        <hr />
        {comments.map(comment => (
          <CommentCard comment={comment} key={comment._id} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CommentsList;
