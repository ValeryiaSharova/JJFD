import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../hooks/useQualities';

const Qualities = ({ qualitiesId }) => {
  const { isLoading, getQuality } = useQualities();
  const qualities = qualitiesId.map(q => getQuality(q));
  const getQualityClasses = quality => {
    return `badge bg-${quality.color} m-2`;
  };
  if (!isLoading) {
    return (
      <>
        {qualities.map(quality => (
          <span key={quality.color} className={getQualityClasses(quality)}>
            {quality.name}
          </span>
        ))}
      </>
    );
  }
  return <h1>Загрузка...</h1>;
};

Qualities.propTypes = {
  qualitiesId: PropTypes.array.isRequired,
};

export default Qualities;
