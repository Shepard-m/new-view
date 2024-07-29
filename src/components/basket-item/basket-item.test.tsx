import { mockProduct } from '../../utils/moсks';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import BasketItem from './basket-item';

describe('basket-item', () => {
  it('should return component basket-item', () => {
    const buttonsItemTestId = 'basket-item';
    renderWithRouterAndRedux(<BasketItem camera={mockProduct}/>);

    expect(screen.getByTestId(buttonsItemTestId)).toBeInTheDocument();
  });
});
