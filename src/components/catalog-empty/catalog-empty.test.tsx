import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import CatalogEmpty from './catalog-empty';

describe('CatalogEmpty', () => {
  it('should return component CatalogEmpty', () => {
    const filterCatalogTestId = 'CatalogEmpty';
    renderWithRouterAndRedux(<CatalogEmpty />);

    expect(screen.getByTestId(filterCatalogTestId)).toBeInTheDocument();
  });
});
