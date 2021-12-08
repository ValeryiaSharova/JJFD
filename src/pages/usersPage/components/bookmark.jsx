import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ bookmark, id, handleToggleBookmark }) => {
  return (
    <td className="center-elem">
      {bookmark ? (
        <i className="bi bi-bookmark-fill" onClick={() => handleToggleBookmark(id)} />
      ) : (
        <i className="bi bi-bookmark" onClick={() => handleToggleBookmark(id)} />
      )}
    </td>
  );
};

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
};

export default Bookmark;
