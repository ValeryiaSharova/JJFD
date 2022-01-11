import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    if (columns[column].component) {
      const { component } = columns[column];
      if (typeof component === 'function') {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[column].path);
  };
  return (
    <tbody>
      {data.map(item => (
        <tr className="center-elem" key={item._id}>
          {Object.keys(columns).map(column =>
            column === 'name' ? (
              <td key={column}>
                <Link className="link" to={`/users/${item._id}`}>
                  {renderContent(item, column)}
                </Link>
              </td>
            ) : (
              <td key={column}>{renderContent(item, column)}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
};

export default TableBody;
