import { RequestStatus } from '../../../const';
import { mockReviews } from '../../../utils/moсks';
import { TInitialState, reviewsSlice } from './reviews';
import { fetchGetReviews } from '../../api-action';

describe('Reviews Slice', () => {
  const initialState: TInitialState = {
    reviews: null,
    reviewsStatus: RequestStatus.NONE,
  };
  it('should return reviewsStatus = loading fetchGetReviews.pending', () => {
    const expectedState = {
      reviews: null,
      reviewsStatus: RequestStatus.LOADING,
    };

    const result = reviewsSlice.reducer(initialState, fetchGetReviews.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return reviewsStatus = success and reviews = TReview[] fetchGetReviews.fulfilled', () => {
    const expectedState = {
      reviews: [mockReviews],
      reviewsStatus: RequestStatus.SUCCESS,
    };

    const result = reviewsSlice.reducer(initialState, fetchGetReviews.fulfilled([mockReviews], '', ''));

    expect(result).toEqual(expectedState);
  });
  it('should return reviewsStatus = failed fetchGetReviews.rejected', () => {
    const expectedState = {
      reviews: null,
      reviewsStatus: RequestStatus.FAILED,
    };

    const result = reviewsSlice.reducer(initialState, fetchGetReviews.rejected);

    expect(result).toEqual(expectedState);
  });
});
