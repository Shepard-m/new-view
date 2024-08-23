import { mockInitialState } from '../../../utils/mocks-component';
import { basketSlice } from './basket';
import { discountPriceSelectors, percentCouponSelectors } from './basket-selectors';

describe('Basket selectors', () => {
  it('should return percentCoupon', () => {
    const { percentCoupon } = mockInitialState[basketSlice.name];

    const result = percentCouponSelectors(mockInitialState);

    expect(result).toEqual(percentCoupon);
  });
  it('should return discountPrice', () => {
    const { discountPrice } = mockInitialState[basketSlice.name];

    const result = discountPriceSelectors(mockInitialState);

    expect(result).toEqual(discountPrice);
  });
});
