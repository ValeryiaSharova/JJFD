import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const GroupList = ({ items, selectedItem, valueProperty, contentProperty, onItemSelect }) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map(item => {
        return (
          <li
            key={items[item][valueProperty]}
            className={`list-group-item ${_.isEqual(items[item], selectedItem) ? 'active' : ''}`}
            onClick={() => onItemSelect(items[item])}
            role="button"
          >
            {items[item][contentProperty]}
          </li>
        );
      })}
    </ul>
  );
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
};

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
  selectedItem: {},
};

export default GroupList;
