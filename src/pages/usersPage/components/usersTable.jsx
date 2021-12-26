/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';
import Bookmark from './bookmark';
import Table from './table';

const UsersTable = ({ users, onSort, selectedSort, handleToggleBookmark, handleDelete }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: { name: 'Качества', component: user => <Qualities qualities={user.qualities} /> },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: user => (
        <Bookmark
          bookmark={user.bookmark}
          id={user._id}
          handleToggleBookmark={handleToggleBookmark}
        />
      ),
    },
    delete: {
      component: user => (
        <button type="button" className="btn btn-danger" onClick={() => handleDelete(user._id)}>
          delete
        </button>
      ),
    },
  };
  return <Table onSort={onSort} selectedSort={selectedSort} data={users} columns={columns} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
};

export default UsersTable;
