import { createSlice } from '@reduxjs/toolkit';

const initialState = { enities: [] };

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    set(state, action) {
      state.enities.push(action.payload);
    },
  },
});

const { actions, reducer: errorReducer } = errorSlice;

const { set } = actions;

export const setError = message => dispatch => {
  dispatch(set(message));
};

export const getError = () => state => state.errors.entities;

export default errorReducer;
