import { mockPromos } from '../../utils/moks';
import { screen } from '@testing-library/react';
import ButtonsPromo from './buttons-promo';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';

describe('buttons-promo', () => {
  it('should return component buttons-promo', () => {
    const buttonPromoTestId = 'buttons-promo';
    renderWithRouterAndRedux(<ButtonsPromo promos={mockPromos} promo={mockPromos[0]} />);

    expect(screen.getByTestId(buttonPromoTestId)).toBeInTheDocument();
  });
});
