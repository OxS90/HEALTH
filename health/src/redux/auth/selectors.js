
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.user ? state.auth.user._id : null;
export const selectUserName = (state) => state.auth.user ? state.auth.user.name : null;
export const selectAuthError = (state) => state.auth.error;
