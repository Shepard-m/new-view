import { TState } from '../../../types/state';

export const reviewsSelectors = (state: TState) => state.reviews.reviews;
export const reviewsStatusSelectors = (state: TState) => state.reviews.reviewsStatus;
