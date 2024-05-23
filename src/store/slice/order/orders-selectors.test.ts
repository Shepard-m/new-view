import { RequestStatus } from '../../../const';
import { useAppSelector } from '../../../hooks/indexStore';
import { mockPromos } from '../../../utils/moks';
import { cameraSlice } from '../camera/camera';
import { catalogSlice } from '../catalog/catalog';
import { orderSlice } from './order';
import { reviewsSlice } from '../reviews/reviews';
import { similarSlice } from '../similar/similar';
import { promosSlice } from '../promo/promo';
import { orderStatusSelectors } from './ordersSelectors';

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
  it('should return promosSelectors', () => {
    const { orderStatus } = initialState[orderSlice.name];

    const result = orderStatusSelectors(initialState);

    expect(result).toEqual(orderStatus);
  });
});
