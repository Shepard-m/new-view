import { mockProduct } from '../../utils/moсks';
import { screen } from '@testing-library/react';
import BasketList from './basket-list';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';

describe('basket-list', () => {
  it('should return component basket-list', () => {
    const buttonPromoTestId = 'basket-list';

    renderWithRouterAndRedux(<BasketList cameras={[mockProduct]} />);

    expect(screen.getByTestId(buttonPromoTestId)).toBeInTheDocument();
  });
});
