import React from 'react';
import PropTypes from 'prop-types';
import { useProfessions } from '../../../hooks/useProfession';

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const prof = getProfession(id);
  if (!isLoading) {
    return <p>{prof.name}</p>;
  }
  return <h1>Загрузка</h1>;
};

Profession.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Profession;
