import { createSlice } from '@reduxjs/toolkit';
import { fetchGetCamera } from '../../api-action';
import { RequestStatus } from '../../../const';
import { TProduct } from '../../../types/product';

type TInitialState = {
  cameraStatus: string;
  camera: TProduct | null;
}

const initialState: TInitialState = {
  cameraStatus: RequestStatus.NONE,
  camera: null,
};

const cameraSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchGetCamera.pending, (state) => {
        state.cameraStatus = RequestStatus.LOADING;
      })
      .addCase(fetchGetCamera.fulfilled, (state, action) => {
        state.cameraStatus = RequestStatus.SUCCESS;
        state.camera = action.payload;
      })
      .addCase(fetchGetCamera.rejected, (state) => {
        state.cameraStatus = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'camera',
  reducers: {

  }
});

const cameraActions = cameraSlice.actions;

export { cameraActions, cameraSlice };
