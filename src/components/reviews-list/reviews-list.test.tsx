import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { mockReviews } from '../../utils/moсks';
import ReviewsList from './reviews-list';

describe('reviews-list', () => {
  it('should return a component reviews-list', () => {
    const reviewsListTestId = 'reviews-list';
    renderWithRouterAndRedux(<ReviewsList reviews={[mockReviews]} />);

    expect(screen.getByTestId(reviewsListTestId)).toBeInTheDocument();
  });
});
