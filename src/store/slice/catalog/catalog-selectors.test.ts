import { mockInitialState } from '../../../utils/mocks-component';
import { catalogSlice } from '../catalog/catalog';
import { camerasSelectors, statusCamerasSelectors } from './catalog-selectros';


describe('Order selectors', () => {
  it('should return cameras', () => {
    const { cameras } = mockInitialState[catalogSlice.name];

    const result = camerasSelectors(mockInitialState);

    expect(result).toEqual(cameras);
  });
  it('should return statusCameras', () => {
    const { statusCameras } = mockInitialState[catalogSlice.name];

    const result = statusCamerasSelectors(mockInitialState);

    expect(result).toEqual(statusCameras);
  });
});
