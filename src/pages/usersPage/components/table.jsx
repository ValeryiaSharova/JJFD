/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ users, handleDelete }) => {
  const getQualityClasses = quality => {
    return `badge bg-${quality.color} m-2`;
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"> </th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>
              {user.qualities.map(qualities => (
                <span key={qualities.color} className={getQualityClasses(qualities)}>
                  {qualities.name}
                </span>
              ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
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

Table.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Table;
