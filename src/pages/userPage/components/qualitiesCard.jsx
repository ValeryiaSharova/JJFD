import React from 'react';
import PropTypes from 'prop-types';
import Qualities from '../../../sharedComponents/qualities';

const QualitiesCard = ({ qualitiesId }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center ">
        <h5 className="card-title">
          <span>Качества</span>
        </h5>
        <p className="card-text">
          <Qualities qualitiesId={qualitiesId} />
        </p>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  qualitiesId: PropTypes.array.isRequired,
};

export default QualitiesCard;
