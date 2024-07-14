import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import calculatorReducer from './calculator/slice';
import {globalReducer} from './global/slice';
import diaryReducer from "./diary/slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calculator: calculatorReducer,
    diary: diaryReducer,
    global: globalReducer,
  },
});
