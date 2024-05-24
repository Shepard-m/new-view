import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import ProductCard from './product-card';
import { mockProduct } from '../../utils/moks';

describe('product-card', () => {
  it('should return a component product-card without class is-active', () => {
    const productCardTestId = 'product-card';
    const classCard = 'product-card is-active';
    renderWithRouterAndRedux(<ProductCard camera={mockProduct} />);

    expect(screen.getByTestId(productCardTestId)).toBeInTheDocument();
    expect(screen.getByTestId(productCardTestId)).not.toHaveClass(classCard);
  });
  it('should return a component product-card and class is-active', () => {
    const productCardTestId = 'product-card';
    const classCard = 'product-card is-active';
    renderWithRouterAndRedux(<ProductCard camera={mockProduct} isSimilar />);

    expect(screen.getByTestId(productCardTestId)).toBeInTheDocument();
    expect(screen.getByTestId(productCardTestId)).toHaveClass(classCard);
  });
});
