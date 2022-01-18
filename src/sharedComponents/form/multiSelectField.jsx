import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, onChange, name, label, defaultValue, error }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map(optionName => ({
          label: options[optionName].name,
          value: options[optionName]._id,
        }))
      : options;
  const handleChange = value => {
    onChange({ name, value });
  };
  const getInputClasses = () => {
    return `basic-multi-select${error ? ' is-invalid' : ''}`;
  };
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className={getInputClasses()}
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        defaultValue={defaultValue}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.array.isRequired,
  error: PropTypes.string,
};

export default MultiSelectField;
