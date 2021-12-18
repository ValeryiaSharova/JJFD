/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';
import Bookmark from './bookmark';
import Pagination from '../../../sharedComponents/paginationn';
import { paginate } from '../../../utilits/paginate';

const TableOfUsers = ({ users, handleDelete, handleToggleBookmark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const handlePageChange = pageIndex => {
    setCurrentPage(pageIndex);
  };
  const userCrop = paginate(users, currentPage, pageSize);
  return (
    <>
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
          {userCrop.map(user => (
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
      <Pagination
        itemsCount={users.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};

TableOfUsers.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
};

export default TableOfUsers;
