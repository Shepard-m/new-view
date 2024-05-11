import { combineReducers } from '@reduxjs/toolkit';
import { catalogSlice } from './slice/catalog/catalog';
import { reviewsSlice } from './slice/reviews/reviews';
import { cameraSlice } from './slice/camera/camera';
import { promosSlice } from './slice/promo/promo';

export const rootReducer = combineReducers({
  [catalogSlice.name]: catalogSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [cameraSlice.name]: cameraSlice.reducer,
  [promosSlice.name]: promosSlice.reducer,
});
