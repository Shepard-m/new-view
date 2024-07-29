import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { BasketPromoCode } from './basket-promo-сode';

describe('basket-promo-code', () => {
  it('should return component basket-promo-code', () => {
    const buttonsItemTestId = 'basket-promo-code';
    renderWithRouterAndRedux(<BasketPromoCode />);

    expect(screen.getByTestId(buttonsItemTestId)).toBeInTheDocument();
  });
});
