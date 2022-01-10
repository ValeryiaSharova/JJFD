import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <Link key={post.id} to={`posts/${post.id}`}>
          <h3>{post.label}</h3>
        </Link>
      ))}
    </>
  );
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostsList;
