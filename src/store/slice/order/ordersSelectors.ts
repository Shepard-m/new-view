import { TState } from '../../../types/state';

export const orderStatusSelectors = (state: TState) => state.order.orderStatus;
