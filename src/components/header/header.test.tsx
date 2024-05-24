import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import Header from './header';

describe('header', () => {
  it('should return component header', () => {
    const headerTestId = 'header';
    renderWithRouterAndRedux(<Header />);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});
