import { createSlice } from '@reduxjs/toolkit';
import { fetchPostOrder } from '../../api-action';
import { RequestStatus } from '../../../const';

type TInitialState = {
  orderStatus: typeof RequestStatus.NONE;
}

const initialState: TInitialState = {
  orderStatus: RequestStatus.NONE,
};

const orderSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchPostOrder.pending, (state) => {
        state.orderStatus = RequestStatus.LOADING;
      })
      .addCase(fetchPostOrder.fulfilled, (state) => {
        state.orderStatus = RequestStatus.SUCCESS;
      })
      .addCase(fetchPostOrder.rejected, (state) => {
        state.orderStatus = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'order',
  reducers: {

  }
});

const orderActions = orderSlice.actions;

export { orderActions, orderSlice };
