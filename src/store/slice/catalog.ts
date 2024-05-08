import { createSlice } from '@reduxjs/toolkit';
import { TProduct } from '../../types/product';
import { RequestStatus } from '../../const';
import { fetchCamerasProduct } from './api-action';


type TInitialState = {
  cameras: TProduct[] | null;
  statusCameras: string;
};

const initialState: TInitialState = {
  statusCameras: RequestStatus.NONE,
  cameras: null,
};

const catalogSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasProduct.pending, (state) => {
        state.statusCameras = RequestStatus.LOADING;
      })
      .addCase(fetchCamerasProduct.fulfilled, (state, action) => {
        state.statusCameras = RequestStatus.SUCCESS;
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasProduct.rejected, (state) => {
        state.statusCameras = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'catalog',
  reducers: {

  },
});

const catalogActions = catalogSlice.actions;

export { catalogActions, catalogSlice };
