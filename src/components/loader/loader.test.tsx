import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import Loader from './loader';

describe('loader', () => {
  it('should return component loader', () => {
    const loaderTestId = 'loader';
    renderWithRouterAndRedux(<Loader />);

    expect(screen.getByTestId(loaderTestId)).toBeInTheDocument();
  });
});
