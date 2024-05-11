import { TState } from '../../../types/state';

export const promosSelectors = (state: TState) => state.promos.promos;
export const promosStatusSelectors = (state: TState) => state.promos.promosStatus;
export const selectedPromoSelectors = (state: TState) => state.promos.selectedPromo;
