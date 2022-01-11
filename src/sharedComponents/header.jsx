import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="nav">
      <Link className="nav-link" to="/">
        Main
      </Link>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/users">
        Users
      </Link>
    </nav>
  );
};

export default Header;
