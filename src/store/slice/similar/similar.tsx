import { createSlice } from '@reduxjs/toolkit';
import { fetchGetSimilar } from '../../api-action';
import { RequestStatus } from '../../../const';
import { TProduct } from '../../../types/product';

type TInitialState = {
  similarStatus: string;
  similar: TProduct[] | null;
}

const initialState: TInitialState = {
  similarStatus: RequestStatus.NONE,
  similar: null,
};

const similarSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchGetSimilar.pending, (state) => {
        state.similarStatus = RequestStatus.LOADING;
      })
      .addCase(fetchGetSimilar.fulfilled, (state, action) => {
        state.similarStatus = RequestStatus.SUCCESS;
        state.similar = action.payload;
      })
      .addCase(fetchGetSimilar.rejected, (state) => {
        state.similarStatus = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'similar',
  reducers: {

  }
});

const similarActions = similarSlice.actions;

export { similarActions, similarSlice };
