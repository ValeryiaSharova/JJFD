import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ qualities }) => {
  const getQualityClasses = quality => {
    return `badge bg-${quality.color} m-2`;
  };
  return (
    <td>
      {qualities.map(qualitie => (
        <span key={qualitie.color} className={getQualityClasses(qualitie)}>
          {qualitie.name}
        </span>
      ))}
    </td>
  );
};

Qualities.propTypes = {
  qualities: PropTypes.object.isRequired,
};

export default Qualities;
