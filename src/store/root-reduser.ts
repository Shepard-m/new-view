import { combineReducers } from '@reduxjs/toolkit';
import { catalogSlice } from './slice/catalog/catalog';
import { reviewsSlice } from './slice/reviews/reviews';
import { cameraSlice } from './slice/camera/camera';
import { promosSlice } from './slice/promo/promo';
import { similarSlice } from './slice/similar/similar';
import { orderSlice } from './slice/order/order';
import { basketSlice } from './slice/basket/basket';

export const rootReducer = combineReducers({
  [catalogSlice.name]: catalogSlice.reducer,
  [reviewsSlice.name]: reviewsSlice.reducer,
  [cameraSlice.name]: cameraSlice.reducer,
  [promosSlice.name]: promosSlice.reducer,
  [similarSlice.name]: similarSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [basketSlice.name]: basketSlice.reducer,
});
