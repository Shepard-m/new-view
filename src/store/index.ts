import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../servies/api';
import { rootReducer } from './root-reduser';
import { State } from 'history';

const api = createAPI();

export function setupStore(preloadedState?: Partial<State>) {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export const store = setupStore();

