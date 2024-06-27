import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview } from '../types/review';
import { TProduct } from '../types/product';
import { Price } from '../types/price';
import { DirectionSorting, FilterCategory, SettingSort } from '../const';

dayjs.locale('ru');

export const converterData = (data: string) => dayjs(data).format('D MMMM');

export const sortReviewsByDate = (reviews: TReview[]) => [...reviews].sort((a, b) => dayjs(b.createAt).diff(dayjs(a.createAt)));

export const OPTIONS_TABS = {
  OPTIONS: 'options',
  DESCRIPTION: 'description',
};

export const formattingPhone = (tel: string) => {
  const cleanedTel = tel.replace(/[\s()-]/g, '');

  if (cleanedTel.startsWith('8')) {
    return `+7${cleanedTel.slice(1)}`;
  }

  return cleanedTel;

};

export const filterCatalog = (initialCatalog: TProduct[] | null, category: string | null, price: Price, type: string[] | null, level: string[] | null, typeDisabled: string[] | null) => {
  if (initialCatalog === null) {
    return null;
  }

  let filterCameras: TProduct[] = [...initialCatalog];

  if (price.from !== null && price.to !== null) {
    filterCameras = filterCameras.filter(
      (camera) => camera.price >= price.from && camera.price <= price.to
    );
  }
  if (category !== null) {
    filterCameras = filterCameras.filter((camera) => camera.category.toLowerCase() === category.toLowerCase());
  }

  if (type !== null && type.length > 0) {
    let listType = [...type];
    if (category === FilterCategory.VIDEOCAMERA.data && typeDisabled !== null) {
      listType = listType.filter((element) => !typeDisabled.includes(element));
    }
    if (listType.length !== 0) {
      filterCameras = filterCameras.filter((camera) =>
        type.map((t) => t.toLowerCase()).includes(camera.type.toLowerCase())
      );
    }
  }

  if (level !== null && level.length > 0) {
    filterCameras = filterCameras.filter((camera) =>
      level.map((l) => l.toLowerCase()).includes(camera.level.toLowerCase())
    );
  }

  return filterCameras;
};

export function selectMinAndMaxPrice(cameras: TProduct[]) {
  const ListCamerasPrice = cameras.map((element) => element.price);

  const minPrice = Math.min(...ListCamerasPrice);
  const maxPrice = Math.max(...ListCamerasPrice);

  return { from: minPrice, to: maxPrice };
}

export const sortingCameras = (cameras: TProduct[], typeSort: string, direction: string) => {
  const copyCameras = [...cameras];
  if (typeSort === SettingSort.price.type) {
    switch (direction) {
      case DirectionSorting.TOP.direction:
        copyCameras.sort((a: TProduct, b: TProduct) => a.price - b.price);
        break;
      case DirectionSorting.DOWN.direction:
        copyCameras.sort((a: TProduct, b: TProduct) => b.price - a.price);
        break;
      default:
        copyCameras.sort((a: TProduct, b: TProduct) => a.price - b.price);
    }
  }

  if (typeSort === SettingSort.popularity.type) {
    switch (direction) {
      case DirectionSorting.TOP.direction:
        copyCameras.sort((a: TProduct, b: TProduct) => a.rating - b.rating);
        break;
      case DirectionSorting.DOWN.direction:
        copyCameras.sort((a: TProduct, b: TProduct) => b.rating - a.rating);
        break;
      default:
        copyCameras.sort((a: TProduct, b: TProduct) => a.rating - b.rating);
    }
  }

  return copyCameras;
};

export const sortingSimilarList = (similarProducts: TProduct[]) => {
  const copySimilar = [...similarProducts];
  if (similarProducts !== null) {

    copySimilar.sort((a: TProduct, b: TProduct) => a.type.localeCompare(b.type));
    copySimilar.sort((a: TProduct, b: TProduct) => a.level.localeCompare(b.level));
    copySimilar.sort((a: TProduct, b: TProduct) => a.category.localeCompare(b.category));
  }
  return copySimilar;
};

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
