import { mockInitialState } from '../../../utils/mocks-component';
import { cameraSlice } from './camera';
import { cameraStatusSelectors, cameraSelectors } from './cameraSelectors';

describe('Order selectors', () => {
  it('should return camera', () => {
    const { camera } = mockInitialState[cameraSlice.name];

    const result = cameraSelectors(mockInitialState);

    expect(result).toEqual(camera);
  });
  it('should return cameraStatus', () => {
    const { cameraStatus } = mockInitialState[cameraSlice.name];

    const result = cameraStatusSelectors(mockInitialState);

    expect(result).toEqual(cameraStatus);
  });
});
