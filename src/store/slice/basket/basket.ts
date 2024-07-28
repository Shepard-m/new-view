import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import calculationDiscount, { getDataLocalStorage, saveDataLocalStorage } from '../../../utils/utils';
import { ArithmeticSigns, KeyLocalStorage, RequestStatus } from '../../../const';
import { TProduct } from '../../../types/product';
import { TPromo } from '../../../types/promo';
import { TIdCount } from '../../../types/id-count';
import { fetchPostCoupons } from '../../api-action';


type TInitialState = {
  statusBasket: string;
  listIdCamerasBasket: string | null;
  discountPrice: number;
  totalPrice: number;
  priceCamerasWithoutPromo: number;
  countCameras: number;
  percentCoupon: number;
  countPromoCameras: number;
  promoProduct: TProduct[] | null;
  selectedPromoCameras: TProduct[] | null;
}

const initialState: TInitialState = {
  statusBasket: RequestStatus.NONE,
  listIdCamerasBasket: null,
  discountPrice: 0,
  totalPrice: 0,
  priceCamerasWithoutPromo: 0,
  countCameras: 0,
  percentCoupon: 0,
  countPromoCameras: 0,
  promoProduct: null,
  selectedPromoCameras: null,
};

const basketSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchPostCoupons.pending, (state) => {
        state.statusBasket = RequestStatus.LOADING;
      })
      .addCase(fetchPostCoupons.fulfilled, (state, action) => {
        state.statusBasket = RequestStatus.SUCCESS;
        state.percentCoupon = action.payload;
      })
      .addCase(fetchPostCoupons.rejected, (state) => {
        state.statusBasket = RequestStatus.FAILED;
        state.percentCoupon = 0;
      });
  },
  initialState,
  name: 'basket',
  reducers: {
    clearPrice: (state) => {
      state.totalPrice = 0;
    },
    installTotalPrice: (state, action: PayloadAction<{ cameras: TProduct[]; promoCameras: TPromo[]; listIdCount?: TIdCount | null}>) => {
      if (state.listIdCamerasBasket){
        let copyTotalPrice = 0;
        let promoCamerasPrice = 0;
        let listSelectId: number[] | null = null;
        const promoCamerasId: number[] = [];
        let camerasIdWithoutPromo: number[] = [];
        const selectedPromoId: number[] = [];
        let copyCountPromo = 0;
        let copyCountPromoWithoutPromo = 0;
        const dataCoupon = getDataLocalStorage(KeyLocalStorage.COUPON);
        let coupon: TIdCount | null = null;
        const camerasIdBasket = state.listIdCamerasBasket.split(',').map(Number);

        if (dataCoupon) {
          coupon = (JSON.parse(dataCoupon) as TIdCount);
          state.percentCoupon = Object.values(coupon).find((v) => v) as number;
        }

        if (action.payload.listIdCount) {
          listSelectId = (Object.keys(action.payload.listIdCount)).map(Number);
        }

        for (const iterator of action.payload.promoCameras) {
          promoCamerasId.push(iterator.id);
        }
        state.promoProduct = action.payload.cameras.filter((promo) => promoCamerasId.includes(promo.id));

        for (const iterator of camerasIdBasket) {
          if (promoCamerasId.includes(iterator)) {
            selectedPromoId.push(iterator);
          }
        }

        state.selectedPromoCameras = action.payload.cameras.filter((camera) => selectedPromoId.includes(camera.id));
        for (const iterator of state.selectedPromoCameras) {
          if (listSelectId?.includes(iterator.id) && action.payload.listIdCount && promoCamerasId.includes(iterator.id)) {
            promoCamerasPrice += iterator.price * action.payload.listIdCount[iterator.id];
            copyCountPromo += action.payload.listIdCount[iterator.id];
          } else {
            promoCamerasPrice += iterator.price;
          }

        }

        const camerasBasketWithoutPromo = action.payload.cameras.filter((element) => camerasIdBasket.includes(element.id) && !promoCamerasId.includes(element.id));
        camerasIdWithoutPromo = camerasBasketWithoutPromo.map((camera) => camera.id);
        for (const iterator of camerasBasketWithoutPromo) {
          if (listSelectId?.includes(iterator.id) && action.payload.listIdCount && camerasIdWithoutPromo.includes(iterator.id)) {
            copyTotalPrice += iterator.price * action.payload.listIdCount[iterator.id];
            copyCountPromoWithoutPromo += action.payload.listIdCount[iterator.id];
          } else {
            copyTotalPrice += iterator.price;
          }

        }

        if (copyCountPromoWithoutPromo !== 0) {
          state.countCameras = copyCountPromoWithoutPromo;
        } else {
          state.countCameras = camerasBasketWithoutPromo.length;
        }

        if (copyCountPromo !== 0) {
          state.countPromoCameras = copyCountPromo;
        } else {
          state.countPromoCameras = selectedPromoId.length;
        }

        saveDataLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET, state.countCameras + state.countPromoCameras);
        state.discountPrice = calculationDiscount(state.countCameras, copyTotalPrice, state.percentCoupon);
        state.totalPrice = copyTotalPrice + promoCamerasPrice;
        state.priceCamerasWithoutPromo = copyTotalPrice;
      }
    },
    changeTotalPrice: (state, action: PayloadAction<{ price: number; sign: string; count: number; id: number }>) => {
      let copyTotalPrice = state.totalPrice;
      let copyPriceCamerasWithoutPromo = state.priceCamerasWithoutPromo;
      const listIdPromoCameras: number[] = [];
      let roundedString = '0';

      if (state.listIdCamerasBasket === null) {
        return;
      }

      if (state.promoProduct !== null) {
        for (const iterator of state.promoProduct) {
          listIdPromoCameras.push(iterator.id);
        }
      }

      if (action.payload.sign === ArithmeticSigns.PLUS) {
        copyTotalPrice += action.payload.price;
        if (!listIdPromoCameras.includes(action.payload.id)) {
          state.countCameras += action.payload.count;
          copyPriceCamerasWithoutPromo += action.payload.price;
        } else {
          state.countPromoCameras += action.payload.count;
        }

      }

      if (action.payload.sign === ArithmeticSigns.SUBTRACTION) {
        copyTotalPrice -= action.payload.price;
        if (!listIdPromoCameras.includes(action.payload.id)) {
          state.countCameras -= action.payload.count;
          copyPriceCamerasWithoutPromo -= action.payload.price;
        }else {
          state.countPromoCameras -= action.payload.count;
        }

      }

      saveDataLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET, state.countCameras + state.countPromoCameras);

      roundedString = (copyTotalPrice).toFixed(2);
      state.discountPrice = calculationDiscount(state.countCameras, copyPriceCamerasWithoutPromo, state.percentCoupon);
      state.totalPrice = Number(roundedString);
      state.priceCamerasWithoutPromo = copyPriceCamerasWithoutPromo;
    },
    saveCameraBasket: (state, action: PayloadAction<{ listId: string }>) => {
      state.listIdCamerasBasket = action.payload.listId;
    },
    removeCameraBasket: (state, action: PayloadAction<{ id: number; count: number; price: number }>) => {
      let listIdPromo: number[] = [];
      state.listIdCamerasBasket = getDataLocalStorage(KeyLocalStorage.BASKET);
      state.totalPrice -= action.payload.price;
      if (state.promoProduct) {
        listIdPromo = state.promoProduct.map((camera) => camera.id);
      }

      if (listIdPromo.includes(action.payload.id) && state.selectedPromoCameras) {
        state.countPromoCameras -= action.payload.count;
        const copySelectedPromoCameras = state.selectedPromoCameras.filter((camera) => camera.id !== action.payload.id);
        state.selectedPromoCameras = copySelectedPromoCameras.length === 0 ? null : copySelectedPromoCameras;
        return;
      }

      state.countCameras -= action.payload.count;
      state.priceCamerasWithoutPromo -= action.payload.price;
      state.discountPrice = calculationDiscount(state.countCameras, state.priceCamerasWithoutPromo, state.percentCoupon);
    },
    clearBasket: (state) => {
      state.statusBasket = RequestStatus.NONE;
      state.listIdCamerasBasket = null;
      state.discountPrice = 0;
      state.totalPrice = 0;
      state.priceCamerasWithoutPromo = 0;
      state.countCameras = 0;
      state.percentCoupon = 0;
      state.countPromoCameras = 0;
      state.promoProduct = null;
      state.selectedPromoCameras = null;
    }
  }
});

const basketActions = basketSlice.actions;

export { basketActions, basketSlice };
