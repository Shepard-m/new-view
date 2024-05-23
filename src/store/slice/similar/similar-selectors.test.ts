import { RequestStatus } from '../../../const';
import { mockPromos } from '../../../utils/moks';
import { cameraSlice } from '../camera/camera';
import { catalogSlice } from '../catalog/catalog';
import { orderSlice } from '../order/order';
import { reviewsSlice } from '../reviews/reviews';
import { similarSlice } from './similar';
import { promosSlice } from '../promo/promo';
import { similarSelectors, similarStatusSelectors } from './similarSelectors';

describe('Order selectors', () => {
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
  it('should return similar', () => {
    const { similar } = initialState[similarSlice.name];

    const result = similarSelectors(initialState);

    expect(result).toEqual(similar);
  });
  it('should return similarStatus', () => {
    const { similarStatus } = initialState[similarSlice.name];

    const result = similarStatusSelectors(initialState);

    expect(result).toEqual(similarStatus);
  });
});
