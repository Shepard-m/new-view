import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TProduct } from '../../types/product';
import { ApiRoute } from '../../const';

export const fetchCamerasProduct = createAsyncThunk<TProduct[], undefined, { extra: AxiosInstance }>(
  'data/fetchCamerasProduct',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TProduct[]>(ApiRoute.CAMERAS);

    return data;
  }
);
