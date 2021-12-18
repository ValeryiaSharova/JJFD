import React from 'react';
import PropTypes from 'prop-types';

const Phrase = ({ users }) => {
  const renderPhrase = number => {
    if (number === 1 || number >= 5) {
      return `${number} человек тусанет с тобой сегодня`;
    }
    if (number >= 2 && number <= 4) {
      return `${number} человека тусанут с тобой сегодня`;
    }
    return 'Никто с тобой не тусанет';
  };
  const getPhraseClasses = () => {
    return users.length ? `badge bg-primary` : `badge bg-danger`;
  };
  return <h1 className={getPhraseClasses()}>{renderPhrase(users.length)}</h1>;
};

Phrase.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Phrase;
