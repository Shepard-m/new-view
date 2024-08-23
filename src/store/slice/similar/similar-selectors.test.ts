import { mockInitialState } from '../../../utils/mocks-component';
import { similarSlice } from './similar';
import { similarSelectors, similarStatusSelectors } from './similarSelectors';


describe('Order selectors', () => {
  it('should return similar', () => {
    const { similar } = mockInitialState[similarSlice.name];

    const result = similarSelectors(mockInitialState);

    expect(result).toEqual(similar);
  });
  it('should return similarStatus', () => {
    const { similarStatus } = mockInitialState[similarSlice.name];

    const result = similarStatusSelectors(mockInitialState);

    expect(result).toEqual(similarStatus);
  });
});
