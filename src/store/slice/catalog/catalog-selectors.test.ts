import { RequestStatus } from '../../../const';
import { mockPromos } from '../../../utils/moks';
import { cameraSlice } from '../camera/camera';
import { catalogSlice } from '../catalog/catalog';
import { orderSlice } from '../order/order';
import { reviewsSlice } from '../reviews/reviews';
import { similarSlice } from '../similar/similar';
import { promosSlice } from '../promo/promo';
import { camerasSelectors, statusCamerasSelectors } from './catalog-selectros';

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
  it('should return cameras', () => {
    const { cameras } = initialState[catalogSlice.name];

    const result = camerasSelectors(initialState);

    expect(result).toEqual(cameras);
  });
  it('should return statusCameras', () => {
    const { statusCameras } = initialState[catalogSlice.name];

    const result = statusCamerasSelectors(initialState);

    expect(result).toEqual(statusCameras);
  });
});
