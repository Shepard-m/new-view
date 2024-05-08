import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../servies/api';
import { rootReducer } from './root-reduser';

const api = createAPI();

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }),
  reducer: rootReducer
});
