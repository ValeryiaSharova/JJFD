import React from 'react';
import PropTypes from 'prop-types';

const Phrase = ({ users, phrase }) => {
  const getPhraseClasses = () => {
    return users.length ? `badge bg-primary` : `badge bg-danger`;
  };
  return <h1 className={getPhraseClasses()}>{phrase}</h1>;
};

Phrase.propTypes = {
  users: PropTypes.array.isRequired,
  phrase: PropTypes.string.isRequired,
};

export default Phrase;
