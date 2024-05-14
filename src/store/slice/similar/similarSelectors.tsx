import { TState } from '../../../types/state';

export const similarSelectors = (state: TState) => state.similar.similar;
export const similarStatusSelectors = (state: TState) => state.similar.similarStatus;
