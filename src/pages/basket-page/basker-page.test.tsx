import { screen } from '@testing-library/react';
import { mockInitialState } from '../../utils/mocks-component';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import BasketPage from './basket-page';
import { setupStore } from '../../store';


describe('camera-page', () => {
  it('should return a component camera-page', () => {
    const cameraPageTestId = 'basket-page';
    renderWithRouterAndRedux(<BasketPage />, { store: setupStore(mockInitialState) });

    expect(screen.getByTestId(cameraPageTestId)).toBeInTheDocument();
  });
});
