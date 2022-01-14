import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="nav">
      <Link className="nav-link" to="/">
        Главная
      </Link>
      <Link className="nav-link" to="/login">
        Вход
      </Link>
      <Link className="nav-link" to="/users">
        Пользователи
      </Link>
    </nav>
  );
};

export default Header;
