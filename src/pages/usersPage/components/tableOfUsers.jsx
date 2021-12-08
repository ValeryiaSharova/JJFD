/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';
import Bookmark from './bookmark';

const TableOfUsers = ({ users, handleDelete, handleToggleBookmark }) => {
  return (
    <table className="table">
      <thead>
        <tr className="center-elem">
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col"> </th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <Qualities qualities={user.qualities} />
            <td className="center-elem">{user.profession.name}</td>
            <td className="center-elem">{user.completedMeetings}</td>
            <td className="center-elem">{user.rate}/5</td>
            <Bookmark
              bookmark={user.bookmark}
              id={user._id}
              handleToggleBookmark={handleToggleBookmark}
            />
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(user._id)}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableOfUsers.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
};

export default TableOfUsers;
