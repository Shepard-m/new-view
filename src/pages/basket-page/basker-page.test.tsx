import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mocks-component';
import BasketPage from './basket-page';
import { DirectionSorting, RequestStatus, SettingSort } from '../../const';
import { setupStore } from '../../store';
import { cameraSlice } from '../../store/slice/camera/camera';
import { catalogSlice } from '../../store/slice/catalog/catalog';
import { orderSlice } from '../../store/slice/order/order';
import { promosSlice } from '../../store/slice/promo/promo';
import { reviewsSlice } from '../../store/slice/reviews/reviews';
import { similarSlice } from '../../store/slice/similar/similar';
import { mockPromos } from '../../utils/moсks';
import { basketSlice } from '../../store/slice/basket/basket';

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
        filterCameras: null,
        filterSettings: {
          price: {
            from: 0,
            to: 0
          },
          category: null,
          type: null,
          level: null,
          disabledType: null,
          placeholderPrice: {
            from: 0,
            to: 0,
          },
        },
        currentPage: 1,
        sliceCamerasByPage: null,
        directionSorting: DirectionSorting.TOP.direction,
        typeSorting: SettingSort.price.type,
      },
      [basketSlice.name]: {
        statusBasket: RequestStatus.NONE,
        listIdCamerasBasket: null,
        discountPrice: 0,
        totalPrice: 0,
        priceCamerasWithoutPromo: 0,
        countCameras: 0,
        percentCoupon: 0,
        countPromoCameras: 0,
        promoProduct: null,
        selectedPromoCameras: null,
      }
    };
    const cameraPageTestId = 'basket-page';
    renderWithRouterAndRedux(<BasketPage />, { store: setupStore(initialState) });

    expect(screen.getByTestId(cameraPageTestId)).toBeInTheDocument();
  });
});
