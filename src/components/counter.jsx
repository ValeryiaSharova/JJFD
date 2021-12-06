/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Counter = props => {
  const [value, setValue] = useState(props.value);

  const formatValue = () => {
    return value === 0 ? 'empty' : value;
  };
  const getBageClasses = () => {
    let classes = 'badge m-2 ';
    classes += value === 0 ? 'bg-warning' : 'bg-primary';
    return classes;
  };

  const handleIncrement = () => {
    setValue(prevState => prevState + 1);
  };
  const handleDecrement = () => {
    setValue(prevState => prevState - 1);
  };

  return (
    <div>
      <span>{props.name}</span>
      <span className={getBageClasses()}>{formatValue()}</span>
      <button className="btn btn-primary btn-sm m-2" type="button" onClick={handleIncrement}>
        +
      </button>
      <button className="btn btn-primary btn-sm m-2" type="button" onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Counter;
