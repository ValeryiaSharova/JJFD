import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const initialState = Object.keys(columns).reduce((prev, column) => {
    if (!columns[column].path) {
      return { ...prev };
    }
    return { ...prev, [columns[column].path]: null };
  }, {});
  const [caret, setCaret] = useState({
    ...initialState,
    [selectedSort.path]: <i className="bi bi-caret-up-fill" />,
  });
  const handleSort = item => {
    if (selectedSort.path === item) {
      onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' });
      setCaret({
        ...initialState,
        [item]:
          selectedSort.order === 'asc' ? (
            <i className="bi bi-caret-down-fill" />
          ) : (
            <i className="bi bi-caret-up-fill" />
          ),
      });
    } else {
      onSort({ path: item, order: 'asc' });
      setCaret({
        ...initialState,
        [item]: <i className="bi bi-caret-up-fill" />,
      });
    }
  };
  return (
    <thead>
      <tr className="center-elem">
        {Object.keys(columns).map(column => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].name}
            {column === 'profession' ? caret['profession.name'] : caret[column]}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableHeader;
