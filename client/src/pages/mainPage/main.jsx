import React from 'react';
import useMockData from '../../utilits/mockData';

const Main = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    initialize();
  };
  return (
    <div className="container mt-5">
      <h1>Главная страница</h1>
      <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Статус: {status}</li>
        <li>Прогресс: {progress}%</li>
        {error && <li>Ошибка: {error}</li>}
      </ul>
      <button className="btn btn-primary" type="button" onClick={handleClick}>
        Инициализировать
      </button>
    </div>
  );
};

export default Main;
