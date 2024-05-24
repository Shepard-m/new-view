import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import Container from './container';

describe('container', () => {
  it('should return component container without a block scroll', () => {
    const containerTestId = 'container';
    const containerScrollTestId = 'container-scroll';
    const testChildren = <span>test</span>;
    renderWithRouterAndRedux(<Container>{testChildren}</Container>);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    expect(screen.queryByTestId(containerScrollTestId)).toBeNull();
  });
  it('should return component container and block scroll', () => {
    const containerTestId = 'container';
    const containerScrollTestId = 'container-scroll';
    const testChildren = <span>test</span>;
    renderWithRouterAndRedux(<Container scroll>{testChildren}</Container>);

    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(containerScrollTestId)).toBeInTheDocument();
  });
});
