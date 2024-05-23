import { RequestStatus } from '../../../const';
import { mockProduct } from '../../../utils/moks';
import { fetchGetCamera } from '../../api-action';
import { cameraSlice } from './camera';
describe('Camera Slice', () => {
  const initialState = {
    cameraStatus: RequestStatus.NONE,
    camera: null,
  };
  it('should return cameraStatus = loading fetchGetCamera.pending', () => {
    const expectedState = {
      cameraStatus: RequestStatus.LOADING,
      camera: null,
    };

    const result = cameraSlice.reducer(initialState, fetchGetCamera.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return cameraStatus = Success and camera = TProduct when fetchGetCamera.fulfilled', () => {
    const expectedState = {
      cameraStatus: RequestStatus.SUCCESS,
      camera: mockProduct,
    };

    const result = cameraSlice.reducer(initialState, fetchGetCamera.fulfilled(mockProduct, '', ''));

    expect(result).toEqual(expectedState);
  });
  it('should return cameraStatus = FAILED when fetchGetCamera.reject', () => {
    const expectedState = {
      cameraStatus: RequestStatus.FAILED,
      camera: null,
    };

    const result = cameraSlice.reducer(initialState, fetchGetCamera.rejected);

    expect(result).toEqual(expectedState);
  });
});
