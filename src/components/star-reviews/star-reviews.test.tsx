import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { StarReviews } from './star-reviews';

describe('star-reviews', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function mockHandler() {

  }
  it('should return component star-reviews', () => {
    const buttonAddBasketTestId = 'star-reviews';
    renderWithRouterAndRedux(<StarReviews handelSelectStarClick={mockHandler}/>);

    expect(screen.getByTestId(buttonAddBasketTestId)).toBeInTheDocument();
  });
});
