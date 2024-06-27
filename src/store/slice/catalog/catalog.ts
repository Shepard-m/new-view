import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TProduct } from '../../../types/product';
import { DirectionSorting, FilterCategory, FilterType, RequestStatus, SettingSort } from '../../../const';
import { fetchCamerasProduct } from '../../api-action';
import { filterSettings } from '../../../types/filter-setings';
import { filterCatalog, selectMinAndMaxPrice, sortingCameras } from '../../../utils/utils';

type TInitialState = {
  cameras: TProduct[] | null;
  filterCameras: TProduct[] | null;
  statusCameras: string;
  filterSettings: filterSettings;
  directionSorting: string;
  typeSorting: string;
};

const initialState: TInitialState = {
  statusCameras: RequestStatus.NONE,
  cameras: null,
  filterCameras: null,
  filterSettings: {
    price: {
      from: 0,
      to: 0
    },
    category: null,
    type: null,
    level: null,
    disabledType: null,
    placeholderPrice: {
      from: 0,
      to: 0,
    },
  },
  directionSorting: DirectionSorting.TOP.direction,
  typeSorting: SettingSort.price.type,
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
        state.filterCameras = sortingCameras(state.cameras, state.typeSorting, state.directionSorting);
        state.filterSettings.price.from = sortingCameras(state.cameras, state.typeSorting, state.directionSorting)[0].price;
        state.filterSettings.price.to = sortingCameras(state.cameras, state.typeSorting, state.directionSorting)[state.filterCameras.length - 1].price;
        state.filterSettings.placeholderPrice.from = sortingCameras(state.cameras, state.typeSorting, state.directionSorting)[0].price;
        state.filterSettings.placeholderPrice.to = sortingCameras(state.cameras, state.typeSorting, state.directionSorting)[state.filterCameras.length - 1].price;
      })
      .addCase(fetchCamerasProduct.rejected, (state) => {
        state.statusCameras = RequestStatus.FAILED;
      });
  },
  initialState,
  name: 'catalog',
  reducers: {
    sortingByDirection: (state, action: PayloadAction<{ direction: string | null }>) => {
      if (action.payload.direction !== null) {
        state.directionSorting = action.payload.direction;
      }
      state.filterCameras = sortingCameras(state.filterCameras as TProduct[], state.typeSorting, state.directionSorting);
    },
    sortingByType: (state, action: PayloadAction<{ type: string | null }>) => {
      if (action.payload.type !== null) {
        state.typeSorting = action.payload.type;
      }
      state.filterCameras = sortingCameras(state.filterCameras as TProduct[], state.typeSorting, state.directionSorting);
    },
    filterPrice: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const initialPrices = state.cameras?.map((element) => element.price);
      const minPrice = Math.min(...initialPrices as number[]);
      const maxPrice = Math.max(...initialPrices as number[]);
      state.filterCameras = filterCatalog(state.cameras, state.filterSettings.category, { from: minPrice, to: maxPrice }, state.filterSettings.type, state.filterSettings.level, state.filterSettings.disabledType);

      const cameras = state.filterCameras?.map((element) => element.price);

      if (cameras === undefined) {
        return;
      }

      const minFilterPrice = Math.min(...cameras);
      const maxFilterPrice = Math.max(...cameras);

      if (action.payload.from < minFilterPrice || action.payload.from > maxFilterPrice) {
        state.filterSettings.price.from = minFilterPrice;
      } else {
        state.filterSettings.price.from = action.payload.from;
      }

      if (action.payload.to > maxFilterPrice || action.payload.to < minFilterPrice) {
        state.filterSettings.price.to = maxFilterPrice;
      } else {
        state.filterSettings.price.to = action.payload.to;
      }

      if (action.payload.from === 0) {
        state.filterSettings.price.from = minPrice;
      }
      if (action.payload.to === 0) {
        state.filterSettings.price.to = maxPrice;
      }

      state.filterCameras = filterCatalog(state.cameras, state.filterSettings.category, state.filterSettings.price, state.filterSettings.type, state.filterSettings.level, state.filterSettings.disabledType);
      state.filterCameras = sortingCameras(state.filterCameras as TProduct[], state.typeSorting, state.directionSorting);
    },
    filterType: (state, action: PayloadAction<{ type: string }>) => {
      const typeElement = state.filterSettings.type?.find((type) => type === action.payload.type);
      if (typeElement === undefined) {
        let listType: string[] = [];
        if (state.filterSettings.type !== null) {
          listType = [...state.filterSettings.type];
        }
        listType.push(action.payload.type);
        state.filterSettings.type = listType;
      } else {
        if (state.filterSettings.type) {
          state.filterSettings.type = state.filterSettings.type.filter((type) => type !== action.payload.type);
        }
      }
      state.filterCameras = filterCatalog(state.cameras, state.filterSettings.category, state.filterSettings.price, state.filterSettings.type, state.filterSettings.level, state.filterSettings.disabledType);
      state.filterCameras = sortingCameras(state.filterCameras as TProduct[], state.typeSorting, state.directionSorting);
      const price = selectMinAndMaxPrice(state.filterCameras);
      state.filterSettings.placeholderPrice = price;
    },
    filterLevel: (state, action: PayloadAction<{ level: string }>) => {
      const levelElement = state.filterSettings.level?.find((type) => type === action.payload.level);
      if (levelElement === undefined) {
        let listLevel: string[] = [];
        if (state.filterSettings.level !== null) {
          listLevel = [...state.filterSettings.level];
        }
        listLevel.push(action.payload.level);
        state.filterSettings.level = listLevel;
      } else {
        if (state.filterSettings.level) {
          state.filterSettings.level = state.filterSettings.level.filter((type) => type !== action.payload.level);
        }
      }
      state.filterCameras = filterCatalog(state.cameras, state.filterSettings.category, state.filterSettings.price, state.filterSettings.type, state.filterSettings.level, state.filterSettings.disabledType);
      state.filterCameras = sortingCameras(state.filterCameras as TProduct[], state.typeSorting, state.directionSorting);
      const price = selectMinAndMaxPrice(state.filterCameras);
      state.filterSettings.placeholderPrice = price;
    },
    filterCategory: (state, action: PayloadAction<{ category: string }>) => {
      const filterDisabled = [];
      state.filterSettings.category = action.payload.category;
      if (state.filterSettings.category === FilterCategory.VIDEOCAMERA.data) {
        filterDisabled.push(FilterType.SNAPSHOT, FilterType.FILM);
        state.filterSettings.disabledType = filterDisabled;
      } else {
        state.filterSettings.disabledType = null;
      }
      state.filterCameras = filterCatalog(state.cameras, state.filterSettings.category, state.filterSettings.price, state.filterSettings.type, state.filterSettings.level, state.filterSettings.disabledType);
      state.filterCameras = sortingCameras(state.filterCameras as TProduct[], state.typeSorting, state.directionSorting);
      const price = selectMinAndMaxPrice(state.filterCameras);
      state.filterSettings.placeholderPrice = price;
    },
    clearFilter: (state) => {
      if (state.cameras === null) {
        return;
      }
      state.filterSettings = {
        price: {
          from: sortingCameras(state.cameras as TProduct[], SettingSort.price.type, DirectionSorting.TOP.direction)[0].price,
          to: sortingCameras(state.cameras as TProduct[], SettingSort.price.type, DirectionSorting.TOP.direction)[state.cameras?.length - 1].price
        },
        category: null,
        type: null,
        level: null,
        disabledType: null,
        placeholderPrice: {
          from: sortingCameras(state.cameras as TProduct[], SettingSort.price.type, DirectionSorting.TOP.direction)[0].price,
          to: sortingCameras(state.cameras as TProduct[], SettingSort.price.type, DirectionSorting.TOP.direction)[state.cameras?.length - 1].price
        }
      };
      state.filterCameras = filterCatalog(state.cameras, state.filterSettings.category, state.filterSettings.price, state.filterSettings.type, state.filterSettings.level, state.filterSettings.disabledType);
      state.filterCameras = sortingCameras(state.filterCameras as TProduct[], state.typeSorting, state.directionSorting);
    }
  },
});

const catalogActions = catalogSlice.actions;

export { catalogActions, catalogSlice };
