import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { calculatePublicDailyRate, calculateUserDailyRate } from '../../redux/calculator/operations.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} from '../../redux/auth/operations.js';
import {
  addEatenProduct,
  deleteEatenProduct,
  getDayInfo,
  searchProducts,
} from '../../redux/diary/operations.js';

const initialState = {
  isModalOpen: false,
  isModalRecommendationsOpen: false,
  isModalLogoutOpen: false,
  isLoading: false,
  error: null,
};

const extraActions = [
  calculatePublicDailyRate,
  calculateUserDailyRate,
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  addEatenProduct,
  deleteEatenProduct,
  getDayInfo,
  searchProducts,
];

const getActions = (type) => extraActions.map(action => action[type]);

const handlePending = (state) => {
  state.isLoading = true;
};

const handleFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    openModalRecommendations(state) {
      state.isModalRecommendationsOpen = true;
    },
    openModalLogout(state) {
      state.isModalLogoutOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.isModalLogoutOpen = false;
      state.isModalRecommendationsOpen = false;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected);
  },
});

export const { openModal, openModalLogout, openModalRecommendations, closeModal } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
