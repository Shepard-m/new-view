import { createSlice } from '@reduxjs/toolkit';
import { fetchGetReviews, fetchPostReview } from '../../api-action';
import { RequestStatus } from '../../../const';
import { TReview } from '../../../types/review';

export type TInitialState = {
  reviews: TReview[] | null;
  reviewsStatus: string;
}

const initialState: TInitialState = {
  reviews: null,
  reviewsStatus: RequestStatus.NONE,
};

const reviewsSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchGetReviews.pending, (state) => {
        state.reviewsStatus = RequestStatus.LOADING;
      })
      .addCase(fetchGetReviews.fulfilled, (state, action) => {
        state.reviewsStatus = RequestStatus.SUCCESS;
        state.reviews = action.payload;
      })
      .addCase(fetchGetReviews.rejected, (state) => {
        state.reviewsStatus = RequestStatus.FAILED;
      })
      .addCase(fetchPostReview.pending, (state) => {
        state.reviewsStatus = RequestStatus.LOADING;
      })
      .addCase(fetchPostReview.fulfilled, (state) => {
        state.reviewsStatus = RequestStatus.SUCCESS;
      })
      .addCase(fetchPostReview.rejected, (state) => {
        state.reviewsStatus = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'reviews',
  reducers: {

  }
});

const reviewsActions = reviewsSlice.actions;

export { reviewsActions, reviewsSlice };
