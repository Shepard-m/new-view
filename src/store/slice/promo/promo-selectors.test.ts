import { store } from '../..';
import { RequestStatus } from '../../../const';
import { useAppSelector } from '../../../hooks/indexStore';
import { mockPromos } from '../../../utils/moks';
import { rootReducer } from '../../root-reduser';
import { cameraSlice } from '../camera/camera';
import { catalogSlice } from '../catalog/catalog';
import { orderSlice } from '../order/order';
import { reviewsSlice } from '../reviews/reviews';
import { similarSlice } from '../similar/similar';
import { promosSlice } from './promo';
import { promosSelectors, promosStatusSelectors, selectedPromoSelectors } from './promo-selectors';

describe('Promo selectors', () => {
  const selectors = useAppSelector;
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
    },
  };
  it('should return promos', () => {
    const { promos } = initialState[promosSlice.name];

    const result = promosSelectors(initialState);

    expect(result).toEqual(promos);
  });
  it('should return selectedPromo', () => {
    const { selectedPromo } = initialState[promosSlice.name];

    const result = selectedPromoSelectors(initialState);

    expect(result).toEqual(selectedPromo);
  });
  it('should return promosStatus', () => {
    const { promosStatus } = initialState[promosSlice.name];

    const result = promosStatusSelectors(initialState);

    expect(result).toEqual(promosStatus);
  });
});
