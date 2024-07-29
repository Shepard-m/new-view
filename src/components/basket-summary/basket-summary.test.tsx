import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import BasketSummary from './basket-summary';

describe('basket-summary', () => {
  it('should return component basket-summary', () => {
    const basketSummaryTestId = 'basket-summary';
    renderWithRouterAndRedux(<BasketSummary />);

    expect(screen.getByTestId(basketSummaryTestId)).toBeInTheDocument();
  });
});
