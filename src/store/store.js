import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import tokenReducer from './modules/tokenSlice';
import contactSlice from './modules/contactSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    contact: contactSlice,
  },
});