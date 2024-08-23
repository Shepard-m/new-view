import { mockInitialState } from '../../../utils/mocks-component';
import { promosSlice } from './promo';
import { promosSelectors, promosStatusSelectors, selectedPromoSelectors } from './promo-selectors';

describe('Promo selectors', () => {
  it('should return promos', () => {
    const { promos } = mockInitialState[promosSlice.name];

    const result = promosSelectors(mockInitialState);

    expect(result).toEqual(promos);
  });
  it('should return selectedPromo', () => {
    const { selectedPromo } = mockInitialState[promosSlice.name];

    const result = selectedPromoSelectors(mockInitialState);

    expect(result).toEqual(selectedPromo);
  });
  it('should return promosStatus', () => {
    const { promosStatus } = mockInitialState[promosSlice.name];

    const result = promosStatusSelectors(mockInitialState);

    expect(result).toEqual(promosStatus);
  });
});
