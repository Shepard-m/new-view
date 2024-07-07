import { DirectionSorting, RequestStatus, SettingSort } from '../../../const';
import { mockProduct } from '../../../utils/moks';
import { fetchCamerasProduct } from '../../api-action';
import { catalogSlice } from './catalog';
describe('Catalog Slice', () => {
  const initialState = {
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
    currentPage: 1,
    sliceCamerasByPage: null,
    directionSorting: DirectionSorting.TOP.direction,
    typeSorting: SettingSort.price.type,
  };
  it('should return statusCameras = loading fetchCamerasProduct.pending', () => {
    const expectedState = {
      statusCameras: RequestStatus.LOADING,
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
      currentPage: 1,
      sliceCamerasByPage: null,
      directionSorting: DirectionSorting.TOP.direction,
      typeSorting: SettingSort.price.type,
    };

    const result = catalogSlice.reducer(initialState, fetchCamerasProduct.pending);

    expect(result).toEqual(expectedState);
  });
  it('should return statusCameras = Success and cameras = TProduct[] when fetchCamerasProduct.fulfilled', () => {
    const expectedState = {
      statusCameras: RequestStatus.SUCCESS,
      cameras: [mockProduct],
      filterCameras: [mockProduct],
      filterSettings: {
        price: {
          from: mockProduct.price,
          to: mockProduct.price
        },
        category: null,
        type: null,
        level: null,
        disabledType: null,
        placeholderPrice: {
          from: mockProduct.price,
          to: mockProduct.price,
        },
      },
      currentPage: 1,
      sliceCamerasByPage: [mockProduct],
      directionSorting: DirectionSorting.TOP.direction,
      typeSorting: SettingSort.price.type,
    };

    const result = catalogSlice.reducer(initialState, fetchCamerasProduct.fulfilled([mockProduct], '', undefined));

    expect(result).toEqual(expectedState);
  });
  it('should return statusCameras = FAILED when fetchCamerasProduct.reject', () => {
    const expectedState = {
      statusCameras: RequestStatus.FAILED,
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
      currentPage: 1,
      sliceCamerasByPage: null,
      directionSorting: DirectionSorting.TOP.direction,
      typeSorting: SettingSort.price.type,
    };

    const result = catalogSlice.reducer(initialState, fetchCamerasProduct.rejected);

    expect(result).toEqual(expectedState);
  });
});
