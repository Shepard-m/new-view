import { DirectionSorting, RequestStatus, SettingSort } from '../../../const';
import { mockPromos } from '../../../utils/moсks';
import { cameraSlice } from '../camera/camera';
import { catalogSlice } from '../catalog/catalog';
import { orderSlice } from '../order/order';
import { reviewsSlice } from '../reviews/reviews';
import { similarSlice } from '../similar/similar';
import { promosSlice } from '../promo/promo';
import { basketSlice } from './basket';
import { discountPriceSelectors, percentCouponSelectors } from './basket-selectors';

describe('Basket selectors', () => {
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
  it('should return percentCoupon', () => {
    const { percentCoupon } = initialState[basketSlice.name];

    const result = percentCouponSelectors(initialState);

    expect(result).toEqual(percentCoupon);
  });
  it('should return discountPrice', () => {
    const { discountPrice } = initialState[basketSlice.name];

    const result = discountPriceSelectors(initialState);

    expect(result).toEqual(discountPrice);
  });
});
