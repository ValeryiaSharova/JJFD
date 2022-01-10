import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Post = ({ id, posts }) => {
  const history = useHistory();
  const getPostById = postId => {
    return posts.find(post => post.id.toString() === postId);
  };
  const handleSave = () => {
    history.replace('/posts');
  };
  const post = getPostById(id);
  return (
    <>
      <h2>{post ? post.label : `Post with id: ${id} not found`}</h2>
      <button
        type="button"
        onClick={() => {
          handleSave();
        }}
      >
        Save
      </button>
    </>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Post;
