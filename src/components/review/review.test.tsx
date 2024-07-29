import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import Review from './review';
import { mockReviews } from '../../utils/moсks';

describe('review', () => {
  it('should return a component review', () => {
    const reviewTestId = 'review';
    renderWithRouterAndRedux(<Review review={mockReviews} />);

    expect(screen.getByTestId(reviewTestId)).toBeInTheDocument();
  });
});
