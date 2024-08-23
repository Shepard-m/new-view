import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RenderOptions, render } from '@testing-library/react';
import { AppStore, RootState, setupStore } from '../store';
import { PropsWithChildren, ReactElement } from 'react';
import { RequestStatus, DirectionSorting, SettingSort } from '../const';
import { basketSlice } from '../store/slice/basket/basket';
import { cameraSlice } from '../store/slice/camera/camera';
import { catalogSlice } from '../store/slice/catalog/catalog';
import { orderSlice } from '../store/slice/order/order';
import { promosSlice } from '../store/slice/promo/promo';
import { reviewsSlice } from '../store/slice/reviews/reviews';
import { similarSlice } from '../store/slice/similar/similar';
import { mockPromos } from './moсks';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithRouterAndRedux(component: ReactElement, { route = '/', preloadedState = {}, store: Store = setupStore(preloadedState) }: ExtendedRenderOptions & { route?: string } = {}) {
  window.history.pushState({}, document.title, route);
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={Store}>
            {children}
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    );
  }

  return { store: Store, ...render(component, { wrapper: Wrapper }) };
}

export const mockInitialState = {
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
