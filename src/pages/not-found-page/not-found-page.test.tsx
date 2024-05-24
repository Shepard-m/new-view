import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import NotFoundPage from './not-found-page';

describe('not-found-page', () => {
  it('should return a component not-found-page', () => {
    const notFoundPageTestId = 'not-found-page';
    renderWithRouterAndRedux(<NotFoundPage />);

    expect(screen.getByTestId(notFoundPageTestId)).toBeInTheDocument();
  });
});
