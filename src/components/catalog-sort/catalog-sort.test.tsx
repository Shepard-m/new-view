import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import CatalogSort from './catalog-sort';

describe('catalogSortTestId', () => {
  it('should return component catalogSortTestId', () => {
    const catalogSortTestId = 'CatalogSort';
    renderWithRouterAndRedux(<CatalogSort />);

    expect(screen.getByTestId(catalogSortTestId)).toBeInTheDocument();
  });
});
