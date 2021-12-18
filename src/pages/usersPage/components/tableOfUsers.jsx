/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Qualities from './qualities';
import Bookmark from './bookmark';
import Pagination from '../../../sharedComponents/paginationn';
import { paginate } from '../../../utilits/paginate';
import GroupList from '../../../sharedComponents/groupList';
import api from '../../../api/index';
import Phrase from './phrase';

const TableOfUsers = ({ users, handleDelete, handleToggleBookmark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  useEffect(() => {
    api.professions.fetchAll().then(data => {
      setProfessions(data);
    });
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  const pageSize = 2;
  const handlePageChange = pageIndex => {
    setCurrentPage(pageIndex);
  };
  const handleProfessionSelect = item => {
    setSelectedProf(item);
  };
  const clearFilter = () => {
    setSelectedProf();
  };
  const filteredUsers = selectedProf
    ? users.filter(user => _.isEqual(user.profession, selectedProf))
    : users;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  return (
    <>
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" type="button" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <Phrase users={filteredUsers} />
        {users.length ? (
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
        ) : null}

        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={filteredUsers.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

TableOfUsers.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleBookmark: PropTypes.func.isRequired,
};

export default TableOfUsers;
