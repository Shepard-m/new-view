import { RequestStatus } from '../../../const';
import { mockProduct } from '../../../utils/moks';
import { fetchCamerasProduct } from '../../api-action';
import { catalogSlice } from './catalog';
describe('Catalog Slice', () => {
  const initialState = {
    statusCameras: RequestStatus.NONE,
    cameras: null,
  };
  it('should return statusCameras = loading fetchCamerasProduct.pending', () => {
    const expectedState = {
      statusCameras: RequestStatus.LOADING,
      cameras: null,
    };

    const result = catalogSlice.reducer(initialState, fetchCamerasProduct.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return statusCameras = Success and cameras = TProduct[] when fetchCamerasProduct.fulfilled', () => {
    const expectedState = {
      statusCameras: RequestStatus.SUCCESS,
      cameras: [mockProduct],
    };

    const result = catalogSlice.reducer(initialState, fetchCamerasProduct.fulfilled([mockProduct], '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return statusCameras = FAILED when fetchCamerasProduct.reject', () => {
    const expectedState = {
      statusCameras: RequestStatus.FAILED,
      cameras: null,
    };

    const result = catalogSlice.reducer(initialState, fetchCamerasProduct.rejected);

    expect(result).toEqual(expectedState);
  });
});
