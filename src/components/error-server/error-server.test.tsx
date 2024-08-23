import { screen } from '@testing-library/react';
import { mockInitialState, renderWithRouterAndRedux } from '../../utils/mocks-component';
import ErrorServer from './error-server';
import { setupStore } from '../../store';

describe('ErrorServer', () => {
  it('should return a component ErrorServer', () => {
    const errorServerTestId = 'ErrorServer';
    renderWithRouterAndRedux(<ErrorServer />, { store: setupStore(mockInitialState) });

    expect(screen.getByTestId(errorServerTestId)).toBeInTheDocument();
  });
});
