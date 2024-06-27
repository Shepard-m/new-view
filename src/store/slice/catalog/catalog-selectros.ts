import { TState } from '../../../types/state';

export const camerasSelectors = (state: TState) => state.catalog.cameras;
export const statusCamerasSelectors = (state: TState) => state.catalog.statusCameras;
export const filterCamerasSelectors = (state: TState) => state.catalog.filterCameras;
export const filterSettingsSelectors = (state: TState) => state.catalog.filterSettings;
export const typeSortingSelectors = (state: TState) => state.catalog.typeSorting;
export const directionSortingSelectors = (state: TState) => state.catalog.directionSorting;
