import {authApi} from './api/authApi';
import authSlice from './slices/authSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {todoApi} from './api/todoApi';

const combinedReducers = combineReducers({
  auth: authSlice,
  [todoApi.reducerPath]: todoApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(todoApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
