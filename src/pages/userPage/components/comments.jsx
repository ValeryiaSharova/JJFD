import React from 'react';
import { orderBy } from 'lodash';
import { useSelector } from 'react-redux';
import CommentForm from './commentForm';
import Comment from './comment';
import { useComments } from '../../../hooks/useComments';
import { getCurrentUserId } from '../../../store/users';

const Comments = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const { comments, createComment, removeComment } = useComments();

  const handleSubmit = data => {
    createComment(data);
  };

  const handleDelete = id => {
    removeComment(id);
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
              {comments.map(comment => (
                <Comment comment={comment} handleDelete={handleDelete} key={comment._id} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
  return <h1>Загрузка...</h1>;
};
export default Comments;
