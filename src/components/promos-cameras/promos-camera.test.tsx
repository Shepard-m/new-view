import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import PromosCameras from './promos-cameras';
import { promosSlice } from '../../store/slice/promo/promo';
import { mockPromos } from '../../utils/moks';
import { RequestStatus } from '../../const';
import { cameraSlice } from '../../store/slice/camera/camera';
import { catalogSlice } from '../../store/slice/catalog/catalog';
import { orderSlice } from '../../store/slice/order/order';
import { reviewsSlice } from '../../store/slice/reviews/reviews';
import { similarSlice } from '../../store/slice/similar/similar';
import { setupStore } from '../../store';

describe('promos-cameras', () => {
  it('should return a component promos-cameras', () => {
    const initialState = {
      [promosSlice.name]: {
        promos: mockPromos,
        selectedPromo: mockPromos[0],
        promosStatus: RequestStatus.NONE,
      },
      [reviewsSlice.name]: {
        reviews: null,
        reviewsStatus: RequestStatus.NONE,
      },
      [cameraSlice.name]: {
        cameraStatus: RequestStatus.NONE,
        camera: null,
      },
      [similarSlice.name]: {
        similarStatus: RequestStatus.NONE,
        similar: null,
      },
      [orderSlice.name]: {
        orderStatus: RequestStatus.NONE,
      },
      [catalogSlice.name]: {
        statusCameras: RequestStatus.NONE,
        cameras: null,
      },
    };
    const promosCamerasTestId = 'promos-cameras';
    renderWithRouterAndRedux(<PromosCameras />, { store: setupStore(initialState) });

    expect(screen.getByTestId(promosCamerasTestId)).toBeInTheDocument();
  });
});
