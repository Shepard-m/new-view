import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import BreadcrumbsList from './breadcrumbs-list';

describe('breadcrumbs-list', () => {
  it('should return component breadcrumbs-list', () => {
    const breadcrumbsListTestId = 'breadcrumbs-list';
    renderWithRouterAndRedux(<BreadcrumbsList />);

    expect(screen.getByTestId(breadcrumbsListTestId)).toBeInTheDocument();
  });
});
