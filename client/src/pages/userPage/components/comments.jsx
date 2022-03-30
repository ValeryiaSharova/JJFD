import React, { useEffect } from 'react';
import { orderBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentForm from './commentForm';
import Comment from './comment';
import { getCurrentUserId } from '../../../store/users';
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from '../../../store/comments';

const Comments = () => {
  const { userId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  const handleSubmit = data => {
    dispatch(createComment(data, currentUserId, userId));
  };

  const handleDelete = id => {
    dispatch(removeComment(id));
  };

  if (comments) {
    const sortedComments = orderBy(comments, ['created_at', ['desc']]);
    return (
      <>
        <CommentForm onSubmit={handleSubmit} pageId={currentUserId} />
        {sortedComments.length !== 0 && (
          <div className="card mb-3">
            <div className="card-body">
              <h2>Коментарии</h2>
              <hr />
              {!isLoading ? (
                comments.map(comment => (
                  <Comment comment={comment} handleDelete={handleDelete} key={comment._id} />
                ))
              ) : (
                <h1>Загрузка...</h1>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
  return <h1>Загрузка...</h1>;
};
export default Comments;
