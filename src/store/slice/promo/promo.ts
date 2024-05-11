import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGetPromos } from '../../api-action';
import { RequestStatus } from '../../../const';
import { TPromo } from '../../../types/promo';

type TInitialState = {
  promos: TPromo[] | null;
  selectedPromo: TPromo | undefined;
  promosStatus: string;
}

const initialState: TInitialState = {
  promos: null,
  selectedPromo: undefined,
  promosStatus: RequestStatus.NONE,
};

const promosSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchGetPromos.pending, (state) => {
        state.promosStatus = RequestStatus.LOADING;
      })
      .addCase(fetchGetPromos.fulfilled, (state, action) => {
        state.promosStatus = RequestStatus.SUCCESS;
        state.promos = action.payload;
        state.selectedPromo = action.payload[0];
      })
      .addCase(fetchGetPromos.rejected, (state) => {
        state.promosStatus = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'promos',
  reducers: {
    selectPromo: (state, action: PayloadAction<{ id: string }>) => {

      state.selectedPromo = state.promos?.find((item) => item.id === +action.payload.id
      );
    }
  }
});

const promosActions = promosSlice.actions;

export { promosActions, promosSlice };
