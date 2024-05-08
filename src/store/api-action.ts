import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TProduct } from '../types/product';
import { ApiRoute } from '../const';
import { TReview } from '../types/review';

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
export const fetchGetReviews = createAsyncThunk<TReview[], string, { extra: AxiosInstance }>(
  'fetchGetReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<TReview[]>(`${ApiRoute.CAMERAS}/${id}${ApiRoute.REVIEWS}`);

    return data;
  }
);
