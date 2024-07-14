// src/redux/diary/selectors.js

export const selectDate = (state) => state.diary.date;
export const selectEatenProducts = (state) => state.diary.eatenProducts;
export const selectDayInfo = (state) => state.diary.dayInfo;
export const selectSearchedProducts = (state) => state.diary.searchedProducts;
export const selectDiaryError = (state) => state.diary.error;
export const selectCurrentPage = (state) => state.diary.currentPage;
export const selectItemsPerPage = (state) => state.diary.itemsPerPage;

// Select the summary
export const selectSummary = (state) => {
  const dailyRate = state.calculator.dailyRate;
  const eatenProducts = state.diary.eatenProducts;

  const totalCalories = eatenProducts.reduce((acc, product) => acc + product.calories, 0);
  const kcalLeft = dailyRate - totalCalories;
  const percentsOfDailyRate = (totalCalories / dailyRate) * 100;

  return {
    kcalLeft: kcalLeft > 0 ? kcalLeft : 0,
    kcalConsumed: totalCalories,
    dailyRate: dailyRate,
    percentsOfDailyRate: percentsOfDailyRate > 0 ? percentsOfDailyRate : 0,
  };
};
