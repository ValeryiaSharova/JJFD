/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { paginate } from '../../utilits/paginate';
import GroupList from '../../sharedComponents/groupList';
import Phrase from './components/phrase';
import Pagination from '../../sharedComponents/paginationn';
import UsersTable from './components/usersTable';
import api from '../../api/index';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [users, setUsers] = useState();
  const pageSize = 8;

  useEffect(() => {
    api.users.fetchAll().then(data => {
      setUsers(data);
    });
  }, []);
  useEffect(() => {
    api.professions.fetchAll().then(data => {
      setProfessions(data);
    });
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId));
  };
  const handleToggleBookmark = id => {
    const updateUsers = users.map(user => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(updateUsers);
  };
  const handleProfessionSelect = item => {
    setSelectedProf(item);
  };
  const handlePageChange = pageIndex => {
    setCurrentPage(pageIndex);
  };
  const handleSort = item => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(user => _.isEqual(user.profession, selectedProf))
      : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
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
          <Phrase length={count} />
          {count > 0 ? (
            <UsersTable
              users={userCrop}
              handleDelete={handleDelete}
              handleToggleBookmark={handleToggleBookmark}
              onSort={handleSort}
              selectedSort={sortBy}
            />
          ) : null}

          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return 'loading';
};

export default Users;
