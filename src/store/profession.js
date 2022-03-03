import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';
import isOutdated from '../utilits/checkDateToUpdate';

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    professionsRequested: state => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsReceived, professionsRequestFailed, professionsRequested } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }
};

export const getProfessions = () => state => state.professions.entities;
export const getProfessionsLoadingStatus = () => state => state.professions.isLoading;
export const getProfessionById = professionId => state =>
  state.professions.entities.find(p => p._id === professionId);

export default professionsReducer;
