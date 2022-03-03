import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import userService from '../services/user.service';
import generateAuthError from '../utilits/generateAuthError';
import history from '../utilits/history';
import randomInt from '../utilits/randomInt';

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: state => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: state => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    userUpdatedData: (state, action) => {
      state.entities = state.entities.map(u =>
        u._id === action.payload._id ? { ...action.payload } : u
      );
      state.isLoading = false;
    },
    authRequested: state => {
      state.error = null;
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;
const {
  usersReceived,
  usersRequested,
  usersRequestedFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLoggedOut,
  userUpdatedData,
  authRequested,
} = actions;

export const loadUsersList = () => async dispatch => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestedFailed(error.message));
  }
};

const userCreateRequested = createAction('users/userCreateRequested');
const createUserFailed = createAction('users/createUserFailed');

const createUser = payload => async dispatch => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(payload);
    dispatch(userCreated(content));
    history.push('/users');
  } catch (error) {
    dispatch(createUserFailed(error.message));
  }
};

export const signUp =
  ({ email, password, ...rest }) =>
  async dispatch => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`,
          ...rest,
        })
      );
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const login =
  ({ email, password, redirect }) =>
  async dispatch => {
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const logOut = () => dispatch => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const updateUserData = data => async dispatch => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.updateCurrentUser(data);
    dispatch(userUpdatedData(content));
  } catch (error) {
    dispatch(usersRequestedFailed(error.message));
  }
};

export const getUsers = () => state => state.users.entities;
export const getUsersLoadingStatus = () => state => state.users.isLoading;
export const getUserById = userId => state => state.users.entities.find(u => u._id === userId);
export const getIsLoggedIn = () => state => state.users.isLoggedIn;
export const getDataStatus = () => state => state.users.dataLoaded;
export const getCurrentUserId = () => state => state.users.auth.userId;
export const getCurrentUserData = () => state => {
  return state.users.entities
    ? state.users.entities.find(u => u._id === state.users.auth.userId)
    : null;
};
export const getAuthErrors = () => state => state.users.error;

export default usersReducer;
