import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import App from './app';
import { AppRoute, RequestStatus } from '../../const';
import { cameraSlice } from '../../store/slice/camera/camera';
import { catalogSlice } from '../../store/slice/catalog/catalog';
import { orderSlice } from '../../store/slice/order/order';
import { promosSlice } from '../../store/slice/promo/promo';
import { reviewsSlice } from '../../store/slice/reviews/reviews';
import { similarSlice } from '../../store/slice/similar/similar';
import { mockPromos, mockProduct } from '../../utils/moks';
import { setupStore } from '../../store';

describe('app', () => {
  it('should return the component CatalogPage with the catalog path ', async () => {
    const catalogPageTestId = 'catalog-page';
    renderWithRouterAndRedux(<App />, { route: AppRoute.CATALOG });

    await waitFor(() => expect(screen.getByTestId(catalogPageTestId)).toBeInTheDocument());
  });
  it('should return the component CameraPage with the camera path ', async () => {
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
    renderWithRouterAndRedux(<App />, { route: AppRoute.CAMERA, store: setupStore(initialState) });

    await waitFor(() => expect(screen.getByTestId(cameraPageTestId)).toBeInTheDocument());
  });
});
