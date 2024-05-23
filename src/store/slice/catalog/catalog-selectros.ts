import { TState } from '../../../types/state';

export const camerasSelectors = (state: TState) => state.catalog.cameras;
export const statusCamerasSelectors = (state: TState) => state.catalog.statusCameras;
