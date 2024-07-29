import { RequestStatus } from '../../../const';
import { fetchPostOrder } from '../../api-action';
import { orderSlice } from './order';

describe('Order Slice', () => {
  const initialState = {
    orderStatus: RequestStatus.NONE,
  };
  it('should return orderStatus = loading fetchPostOrder.pending', () => {
    const expectedState = {
      orderStatus: RequestStatus.LOADING,
    };

    const result = orderSlice.reducer(initialState, fetchPostOrder.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return orderStatus = Success when fetchPostOrder.fulfilled', () => {
    const expectedState = {
      orderStatus: RequestStatus.SUCCESS,
    };

    const result = orderSlice.reducer(initialState, fetchPostOrder.fulfilled(undefined, '', { camerasIds: [1], coupon: null }));

    expect(result).toEqual(expectedState);
  });
  it('should return orderStatus = FAILED when fetchPostOrder.reject', () => {
    const expectedState = {
      orderStatus: RequestStatus.FAILED,
    };

    const result = orderSlice.reducer(initialState, fetchPostOrder.rejected);

    expect(result).toEqual(expectedState);
  });
});
