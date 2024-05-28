import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import App from './app';
import { AppRoute } from '../../const';

describe('app', () => {
  it('should return the component CatalogPage with the catalog path ', async () => {
    const catalogPageTestId = 'catalog-page';
    renderWithRouterAndRedux(<App />, { route: AppRoute.CATALOG });

    await waitFor(() => expect(screen.getByTestId(catalogPageTestId)).toBeInTheDocument());
  });
});
