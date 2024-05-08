import { TState } from '../../../types/state';

export const cameraStatusSelectors = (state: TState) => state.camera.cameraStatus;
export const cameraSelectors = (state: TState) => state.camera.camera;
