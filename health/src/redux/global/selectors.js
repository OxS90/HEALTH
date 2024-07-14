// src/redux/global/selectors.js

export const selectIsModalOpen = (state) => state.global.isModalOpen;
export const selectIsModalRecommendationsOpen = (state) => state.global.isModalRecommendationsOpen;
export const selectIsModalLogoutOpen = (state) => state.global.isModalLogoutOpen;
export const selectIsLoading = (state) => state.global.isLoading;
export const selectError = (state) => state.global.error;
