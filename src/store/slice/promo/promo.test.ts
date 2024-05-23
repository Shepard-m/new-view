import { RequestStatus } from '../../../const';
import { mockPromos } from '../../../utils/moks';
import { fetchGetPromos } from '../../api-action';
import { TInitialState, promosActions, promosSlice } from './promo';

describe('Promo Slice', () => {
  const initialState: TInitialState = {
    promos: null,
    selectedPromo: undefined,
    promosStatus: RequestStatus.NONE,
  };
  it('should return promosStatus = loading fetchGetPromos.pending', () => {
    const expectedState = {
      promos: null,
      selectedPromo: undefined,
      promosStatus: RequestStatus.LOADING,
    };

    const result = promosSlice.reducer(initialState, fetchGetPromos.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return promosStatus = Success and promos = TPromo[] when fetchGetPromos.fulfilled', () => {
    const expectedState: TInitialState = {
      promos: mockPromos,
      selectedPromo: mockPromos[0],
      promosStatus: RequestStatus.SUCCESS,
    };

    const result = promosSlice.reducer(initialState, fetchGetPromos.fulfilled(mockPromos, '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return promosStatus = FAILED when fetchGetPromos.reject', () => {
    const expectedState: TInitialState = {
      promos: null,
      selectedPromo: undefined,
      promosStatus: RequestStatus.FAILED,
    };

    const result = promosSlice.reducer(initialState, fetchGetPromos.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return selectedPromo', () => {
    const promoState: TInitialState = {
      promos: mockPromos,
      selectedPromo: undefined,
      promosStatus: RequestStatus.NONE,
    };
    const expectedState: TInitialState = {
      promos: mockPromos,
      selectedPromo: mockPromos[1],
      promosStatus: RequestStatus.NONE,
    };

    const result = promosSlice.reducer(promoState, promosActions.selectPromo({ id: `${mockPromos[1].id}` }));

    expect(result).toEqual(expectedState);
  });
});
