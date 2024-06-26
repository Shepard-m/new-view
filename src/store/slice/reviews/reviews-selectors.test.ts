import { RequestStatus } from '../../../const';
import { mockPromos } from '../../../utils/moks';
import { cameraSlice } from '../camera/camera';
import { catalogSlice } from '../catalog/catalog';
import { orderSlice } from '../order/order';
import { reviewsSlice } from './reviews';
import { similarSlice } from '../similar/similar';
import { promosSlice } from '../promo/promo';
import { reviewsSelectors, reviewsStatusSelectors } from './reviews-selectors';

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
  it('should return reviews', () => {
    const { reviews } = initialState[reviewsSlice.name];

    const result = reviewsSelectors(initialState);

    expect(result).toEqual(reviews);
  });
  it('should return reviewsStatus', () => {
    const { reviewsStatus } = initialState[reviewsSlice.name];

    const result = reviewsStatusSelectors(initialState);

    expect(result).toEqual(reviewsStatus);
  });
});
