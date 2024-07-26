import { TState } from '../../../types/state';

export const listIdCamerasBasketSelectors = (state: TState) => state.basket.listIdCamerasBasket;
export const totalPriceSelectors = (state: TState) => state.basket.totalPrice;
export const discountPriceSelectors = (state: TState) => state.basket.discountPrice;
export const countCamerasSelectors = (state: TState) => state.basket.countCameras;
export const countPromoCamerasSelectors = (state: TState) => state.basket.countPromoCameras;
