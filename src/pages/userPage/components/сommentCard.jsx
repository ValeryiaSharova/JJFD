import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProfileImages from '../../../components/profileImages';
import api from '../../../api/index';
import { displayDate } from '../../../utilits/displayDate';

const CommentCard = ({ comment, onDelete }) => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    api.users.getById(comment.userId).then(data => {
      setUserName(data.name);
    });
  }, []);

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          {userName ? (
            <div className="d-flex flex-start">
              <ProfileImages />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      {userName}{' '}
                      <span className="small"> - {displayDate(Number(comment.created_at))}</span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      type="button"
                      onClick={() => onDelete(comment._id)}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>
                  <p className="small mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Загрузка...</p>
          )}
        </div>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentCard;
