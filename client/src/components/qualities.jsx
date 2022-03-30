import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList,
} from '../store/qualities';

const Qualities = ({ qualitiesId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualities = useSelector(getQualitiesByIds(qualitiesId));
  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);
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
