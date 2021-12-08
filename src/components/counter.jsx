/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Counter = ({ id, value, name, onHandleIncrement, onHandleDecrement, onDelete }) => {
  const formatValue = () => {
    return value === 0 ? 'empty' : value;
  };
  const getBageClasses = () => {
    let classes = 'badge m-2 ';
    classes += value === 0 ? 'bg-warning' : 'bg-primary';
    return classes;
  };

  return (
    <div>
      <span>{name}</span>
      <span className={getBageClasses()}>{formatValue()}</span>
      <button
        className="btn btn-primary btn-sm m-2"
        type="button"
        onClick={() => onHandleIncrement(id)}
      >
        +
      </button>
      <button
        className="btn btn-primary btn-sm m-2"
        type="button"
        onClick={() => onHandleDecrement(id)}
      >
        -
      </button>
      <button className="btn btn-danger btn-sm m-2" type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onHandleIncrement: PropTypes.func.isRequired,
  onHandleDecrement: PropTypes.func.isRequired,
};

export default Counter;
