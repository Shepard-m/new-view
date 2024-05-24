import { mockProduct } from '../../utils/moks';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import CatalogProducts from './catalog-products';

describe('catalog-products', () => {
  it('should return component catalog-products', () => {
    const catalogProductsTestId = 'CatalogProducts';
    renderWithRouterAndRedux(<CatalogProducts cameras={[mockProduct]} />);

    expect(screen.getByTestId(catalogProductsTestId)).toBeInTheDocument();
  });
});
