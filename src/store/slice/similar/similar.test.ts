import { RequestStatus } from '../../../const';
import { mockProduct } from '../../../utils/moks';
import { similarSlice } from './similar';
import { fetchGetSimilar } from '../../api-action';

describe('Similar Slice', () => {
  const initialState = {
    similarStatus: RequestStatus.NONE,
    similar: null,
  };
  it('should return similarStatus = loading fetchGetSimilar.pending', () => {
    const expectedState = {
      similarStatus: RequestStatus.LOADING,
      similar: null,
    };

    const result = similarSlice.reducer(initialState, fetchGetSimilar.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return similarStatus = success and similar = TProduct[] fetchGetSimilar.fulfilled', () => {
    const expectedState = {
      similarStatus: RequestStatus.SUCCESS,
      similar: [mockProduct],
    };

    const result = similarSlice.reducer(initialState, fetchGetSimilar.fulfilled([mockProduct], '', ''));

    expect(result).toEqual(expectedState);
  });
  it('should return similarStatus = failed fetchGetSimilar.rejected', () => {
    const expectedState = {
      similarStatus: RequestStatus.FAILED,
      similar: null,
    };

    const result = similarSlice.reducer(initialState, fetchGetSimilar.rejected);

    expect(result).toEqual(expectedState);
  });
});
