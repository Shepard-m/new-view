import { mockInitialState } from '../../../utils/mocks-component';
import { reviewsSlice } from './reviews';
import { reviewsSelectors, reviewsStatusSelectors } from './reviews-selectors';


describe('Order selectors', () => {
  it('should return reviews', () => {
    const { reviews } = mockInitialState[reviewsSlice.name];

    const result = reviewsSelectors(mockInitialState);

    expect(result).toEqual(reviews);
  });
  it('should return reviewsStatus', () => {
    const { reviewsStatus } = mockInitialState[reviewsSlice.name];

    const result = reviewsStatusSelectors(mockInitialState);

    expect(result).toEqual(reviewsStatus);
  });
});
