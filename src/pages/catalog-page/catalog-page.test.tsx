import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import CatalogPage from './catalog-page';

describe('catalog-page', () => {
  it('should return a component catalog-page', () => {
    const catalogPageTestId = 'catalog-page';
    renderWithRouterAndRedux(<CatalogPage />);

    expect(screen.getByTestId(catalogPageTestId)).toBeInTheDocument();
  });
});
