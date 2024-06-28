import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import Pagination from './pagination';

describe('Pagination', () => {
  it('should return a component Pagination', () => {
    const paginationTestId = 'pagination';
    renderWithRouterAndRedux(<Pagination />);

    expect(screen.getByTestId(paginationTestId)).toBeInTheDocument();
  });
});
