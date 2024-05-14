import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TProduct } from '../types/product';
import { ApiRoute } from '../const';
import { TReview } from '../types/review';
import { TPromo } from '../types/promo';

export const fetchCamerasProduct = createAsyncThunk<TProduct[], undefined, { extra: AxiosInstance }>(
  'data/fetchCamerasProduct',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TProduct[]>(ApiRoute.CAMERAS);

    return data;
  }
);

export const fetchGetCamera = createAsyncThunk<TProduct, string, { extra: AxiosInstance }>(
  'fetchGetCamera',
  async (id, { extra: api }) => {
    const { data } = await api.get<TProduct>(`${ApiRoute.CAMERAS}/${id}`);

    return data;
  }
);
export const fetchGetSimilar = createAsyncThunk<TProduct[], string, { extra: AxiosInstance }>(
  'fetchGetSimilar',
  async (id, { extra: api }) => {
    const { data } = await api.get<TProduct[]>(`${ApiRoute.CAMERAS}/${id}/${ApiRoute.SIMILAR}`);

    return data;
  }
);
export const fetchGetReviews = createAsyncThunk<TReview[], string, { extra: AxiosInstance }>(
  'fetchGetReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<TReview[]>(`${ApiRoute.CAMERAS}/${id}${ApiRoute.REVIEWS}`);

    return data;
  }
);
export const fetchGetPromos = createAsyncThunk<TPromo[], undefined, { extra: AxiosInstance }>(
  'fetchGetPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPromo[]>(ApiRoute.PROMO);

    return data;
  }
);
