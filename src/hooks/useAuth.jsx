import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import userService from '../services/user.service';
import localStorageService from '../services/localStorage.service';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest,
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = { email: 'Пользователь с таким email уже существует' };
          throw errorObject;
        }
        if (message === 'INVALID_EMAIL') {
          const errorObject = { email: 'Неверный email' };
          throw errorObject;
        }
      }
    }
  }

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true,
      });
      localStorageService.setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
          const errorObject = { password: 'Неверно введен email или пароль' };
          throw errorObject;
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push('/');
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn, logOut }}>
      {!isLoading ? children : 'Загрузка'}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthProvider;
