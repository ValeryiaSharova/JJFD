import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { displayDate } from '../../../utilits/displayDate';
import { getCurrentUserId, getUserById } from '../../../store/users';

const Comment = ({ comment, handleDelete }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(comment.userId));

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user.name}
                    <span className="small">- {displayDate(comment.created_at)}</span>
                  </p>
                  {currentUserId === user._id ? (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      type="button"
                      onClick={() => handleDelete(comment._id)}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  ) : null}
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Comment;
