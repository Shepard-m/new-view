import { combineReducers } from '@reduxjs/toolkit';
import { catalogSlice } from './slice/catalog';

export const rootReducer = combineReducers({
  [catalogSlice.name]: catalogSlice.reducer
});
