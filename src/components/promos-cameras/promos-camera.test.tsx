import { screen } from '@testing-library/react';
import { mockInitialState, renderWithRouterAndRedux } from '../../utils/mocks-component';
import PromosCameras from './promos-cameras';
import { setupStore } from '../../store';

describe('promos-cameras', () => {
  it('should return a component promos-cameras', () => {
    const promosCamerasTestId = 'promos-cameras';
    renderWithRouterAndRedux(<PromosCameras />, { store: setupStore(mockInitialState) });

    expect(screen.getByTestId(promosCamerasTestId)).toBeInTheDocument();
  });
});
