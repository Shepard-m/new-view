import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { mockProduct } from '../../utils/moсks';
import ProductInfo from './product-info';

describe('product-info', () => {
  it('should return a component product-info', () => {
    const productInfoTestId = 'product-info';
    renderWithRouterAndRedux(<ProductInfo camera={mockProduct} />);

    expect(screen.getByTestId(productInfoTestId)).toBeInTheDocument();
  });
});
