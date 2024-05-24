import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import Footer from './footer';

describe('footer', () => {
  it('should return component footer', () => {
    const footerTestId = 'footer';
    renderWithRouterAndRedux(<Footer />);

    expect(screen.getByTestId(footerTestId)).toBeInTheDocument();
  });
});
