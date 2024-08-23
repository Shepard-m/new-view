import { mockInitialState } from '../../../utils/mocks-component';
import { orderSlice } from './order';
import { orderStatusSelectors } from './ordersSelectors';


describe('Order selectors', () => {

  it('should return promosSelectors', () => {
    const { orderStatus } = mockInitialState[orderSlice.name];

    const result = orderStatusSelectors(mockInitialState);

    expect(result).toEqual(orderStatus);
  });
});
