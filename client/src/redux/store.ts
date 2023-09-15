import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import evaluateReducer from './slices/evaluateSlice';
export const store = configureStore({
  reducer: {
    userReducer,
    authReducer,
    evaluateReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;