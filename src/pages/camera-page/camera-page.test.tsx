import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import CameraPage from './camera-page';
import { RequestStatus } from '../../const';
import { setupStore } from '../../store';
import { cameraSlice } from '../../store/slice/camera/camera';
import { catalogSlice } from '../../store/slice/catalog/catalog';
import { orderSlice } from '../../store/slice/order/order';
import { promosSlice } from '../../store/slice/promo/promo';
import { reviewsSlice } from '../../store/slice/reviews/reviews';
import { similarSlice } from '../../store/slice/similar/similar';
import { mockProduct, mockPromos } from '../../utils/moks';

describe('camera-page', () => {
  it('should return a component camera-page', () => {
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
        camera: mockProduct,
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
    const cameraPageTestId = 'camera-page';
    renderWithRouterAndRedux(<CameraPage />, { store: setupStore(initialState) });

    expect(screen.getByTestId(cameraPageTestId)).toBeInTheDocument();
  });
});
