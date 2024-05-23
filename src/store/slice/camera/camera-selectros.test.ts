import { RequestStatus } from '../../../const';
import { mockPromos } from '../../../utils/moks';
import { cameraSlice } from '../camera/camera';
import { catalogSlice } from '../catalog/catalog';
import { orderSlice } from '../order/order';
import { reviewsSlice } from '../reviews/reviews';
import { similarSlice } from '../similar/similar';
import { promosSlice } from '../promo/promo';
import { cameraStatusSelectors, cameraSelectors } from './cameraSelectors';

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
  it('should return camera', () => {
    const { camera } = initialState[cameraSlice.name];

    const result = cameraSelectors(initialState);

    expect(result).toEqual(camera);
  });
  it('should return cameraStatus', () => {
    const { cameraStatus } = initialState[cameraSlice.name];

    const result = cameraStatusSelectors(initialState);

    expect(result).toEqual(cameraStatus);
  });
});
