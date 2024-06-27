import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import { FilterCatalog } from './filter-catalog';

describe('FilterCatalog', () => {
  it('should return component FilterCatalog', () => {
    const filterCatalogTestId = 'filter';
    renderWithRouterAndRedux(<FilterCatalog />);

    expect(screen.getByTestId(filterCatalogTestId)).toBeInTheDocument();
  });
});
