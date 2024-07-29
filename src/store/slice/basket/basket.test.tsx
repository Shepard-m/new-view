import { RequestStatus } from '../../../const';
import { fetchPostCoupons } from '../../api-action';
import { basketSlice } from './basket';
describe('Basket Slice', () => {
  const initialState = {
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
  };
  it('should return basketSlice = loading fetchPostCoupons.pending', () => {
    const expectedState = {
      statusBasket: RequestStatus.LOADING,
      listIdCamerasBasket: null,
      discountPrice: 0,
      totalPrice: 0,
      priceCamerasWithoutPromo: 0,
      countCameras: 0,
      percentCoupon: 0,
      countPromoCameras: 0,
      promoProduct: null,
      selectedPromoCameras: null,
    };

    const result = basketSlice.reducer(initialState, fetchPostCoupons.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return basketSlice = Success and coupon = 15 when fetchPostCoupons.fulfilled', () => {
    const expectedState = {
      statusBasket: RequestStatus.SUCCESS,
      listIdCamerasBasket: null,
      discountPrice: 0,
      totalPrice: 0,
      priceCamerasWithoutPromo: 0,
      countCameras: 0,
      percentCoupon: 15,
      countPromoCameras: 0,
      promoProduct: null,
      selectedPromoCameras: null,
    };

    const result = basketSlice.reducer(initialState, fetchPostCoupons.fulfilled(15, '', ''));

    expect(result).toEqual(expectedState);
  });
  it('should return basketSlice = FAILED when fetchPostCoupons.reject', () => {
    const expectedState = {
      statusBasket: RequestStatus.FAILED,
      listIdCamerasBasket: null,
      discountPrice: 0,
      totalPrice: 0,
      priceCamerasWithoutPromo: 0,
      countCameras: 0,
      percentCoupon: 0,
      countPromoCameras: 0,
      promoProduct: null,
      selectedPromoCameras: null,
    };

    const result = basketSlice.reducer(initialState, fetchPostCoupons.rejected);

    expect(result).toEqual(expectedState);
  });
});
