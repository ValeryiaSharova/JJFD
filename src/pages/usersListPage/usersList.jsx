import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { paginate } from '../../utilits/paginate';
import GroupList from '../../sharedComponents/groupList';
import Phrase from './components/phrase';
import Pagination from '../../sharedComponents/pagination';
import UsersTable from './components/usersTable';
import Search from '../../sharedComponents/search';
import { useUser } from '../../hooks/useUsers';
import { useProfessions } from '../../hooks/useProfession';

const UsersList = () => {
  const { users } = useUser();
  const { professions, isLoading: professionsLoading } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchValue, setSearchValue] = useState('');
  const pageSize = 8;

  const handleDelete = userId => {
    // setUsers(users.filter(user => user._id !== userId));
    console.log(userId);
  };
  const handleToggleBookmark = id => {
    const updateUsers = users.map(user => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    // setUsers(updateUsers);
    console.log(updateUsers);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchValue]);

  const handleProfessionSelect = item => {
    if (searchValue) {
      setSearchValue('');
    }
    setSelectedProf(item);
  };
  const handlePageChange = pageIndex => {
    setCurrentPage(pageIndex);
  };
  const handleSort = item => {
    setSortBy(item);
  };

  const filteredUsers = searchValue
    ? users.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
    : selectedProf
    ? users.filter(user => _.isEqual(user.profession, selectedProf))
    : users;
  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  const handleSearch = ({ target }) => {
    clearFilter();
    setSearchValue(target.value);
  };

  return (
    <div className="d-flex">
      {professions && !professionsLoading && (
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
        <Search searchValue={searchValue} handleSearch={handleSearch} />
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
};

export default UsersList;
