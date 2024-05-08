import { combineReducers } from '@reduxjs/toolkit';
import { catalogSlice } from './slice/catalog/catalog';
import { reviewsSlice } from './slice/reviews/reviews';
import { cameraSlice } from './slice/camera/camera';

export const rootReducer = combineReducers({
  [catalogSlice.name]: catalogSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [cameraSlice.name]: cameraSlice.reducer,
});
