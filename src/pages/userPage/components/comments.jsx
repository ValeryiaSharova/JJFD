import React from 'react';
import { orderBy } from 'lodash';
import CommentForm from './commentForm';
import Comment from './comment';
import { useAuth } from '../../../hooks/useAuth';
import { useComments } from '../../../hooks/useComments';

const Comments = () => {
  const { currentUser } = useAuth();
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
        <CommentForm onSubmit={handleSubmit} pageId={currentUser._id} />
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
