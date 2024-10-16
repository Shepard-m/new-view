import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview } from '../types/review';
import { TProduct } from '../types/product';
import { Price } from '../types/price';
import { NavigateFunction } from 'react-router-dom';
import { DirectionSorting, FilterCategory, KeyLocalStorage, OptionDiscountOnCount, OptionDiscountOnPrice, SettingSort, countCamerasForPage } from '../const';
import { TIdCount } from '../types/id-count';

dayjs.locale('ru');
export const converterData = (data: string) => dayjs(data).format('D MMMM');

export const sortReviewsByDate = (reviews: TReview[]) => [...reviews].sort((a, b) => dayjs(b.createAt).diff(dayjs(a.createAt)));

export const OPTIONS_TABS = {
  OPTIONS: {
    type: 'options',
    text: 'Характеристики'
  },
  DESCRIPTION:{
    type: 'description',
    text: 'Описание'
  }
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
    return [];
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

export function debounce<T extends (...args: Parameters<T>) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
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

export function selectCamerasByPage(cameras: TProduct[] | null, page: number) {
  if (cameras === null) {
    return [];
  }
  const from = countCamerasForPage * page - countCamerasForPage;
  const to = countCamerasForPage * page;
  const sliceCameras: TProduct[] = cameras.slice(from, to);

  return sliceCameras;
}

export function updateURLParameter(param: string, value: string, navigate: NavigateFunction, basename = '/new-view/') {
  const url = new URL(window.location.href);

  const currentValue = url.searchParams.get(param);

  if (currentValue === value) {
    return;
  }

  let pathname = url.pathname;

  if (pathname.startsWith(basename)) {
    pathname = pathname.replace(basename, '/');
  }

  url.searchParams.set(param, value);

  navigate(`${pathname}${url.search}`);
}
export function getURLParameter(param: string): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}

export function getURLParameterMulti(param: string): string[] {
  const url = new URL(window.location.href);
  const paramValue = url.searchParams.get(param);
  return paramValue ? paramValue.split(',') : [];
}


export function updateURLParameterMulti(param: string, values: string[], navigate: NavigateFunction, basename = '/new-view/') {
  const url = new URL(window.location.href);

  const currentValue = url.searchParams.get(param);
  if (currentValue === values.join(',')) {
    return;
  }

  let pathname = url.pathname;
  if (pathname.startsWith(basename)) {
    pathname = pathname.replace(basename, '/');
  }

  url.searchParams.delete(param);
  values.forEach((value) => url.searchParams.append(param, value));

  navigate(`${pathname}${url.search}`);
}


export function deleteURLParameter(param: string, navigate: NavigateFunction, basename = '/new-view/') {
  const url = new URL(window.location.href);

  let pathname = url.pathname;
  if (pathname.startsWith(basename)) {
    pathname = pathname.replace(basename, '/');
  }

  url.searchParams.delete(param);

  navigate(`${pathname}${url.search}`);
}

export function saveDataLocalStorage(key: string, data: string | number | TIdCount): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getDataLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  if (data !== null) {
    return data;
  }
  return null;
}

export function addValueToLocalStorage(key: string, value: string): void {
  const currentValue = localStorage.getItem(key);
  if (currentValue && !currentValue?.includes(value)) {
    localStorage.setItem(key, `${currentValue}, ${value}`);
    return;
  }
  if (currentValue) {
    localStorage.setItem(key, currentValue);
    return;
  }

  localStorage.setItem(key, value);
}

export function removeValueToLocalStorage(key: string, value: number): void {
  let dataKey = localStorage.getItem(key);
  let listId: number[] = [];

  if (dataKey === null) {
    return;
  }

  listId = dataKey.split(',').map(Number);
  if (listId.includes(value)) {
    dataKey = listId.filter((id) => id !== value).toString();
  }

  if (dataKey === '') {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, dataKey);
}

export function clearValueToLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export default function calculationDiscount(countCamera: number, price: number, percentCoupon: number, promoPrice?: number) {
  let discount = percentCoupon;
  let discountPrice = 0;

  if (countCamera === 1 && percentCoupon === 0) {
    return 0;
  }

  if (countCamera === OptionDiscountOnCount.THREE_PERCENT.countCamera) {
    discount += OptionDiscountOnCount.THREE_PERCENT.percent;
  }

  if (countCamera > OptionDiscountOnCount.THREE_PERCENT.countCamera && countCamera <= OptionDiscountOnCount.FIVE_PERCENT.countCamera) {
    discount += OptionDiscountOnCount.FIVE_PERCENT.percent;
  }

  if (countCamera > OptionDiscountOnCount.FIVE_PERCENT.countCamera && countCamera <= OptionDiscountOnCount.TEN_PERCENT.countCamera) {
    discount += OptionDiscountOnCount.TEN_PERCENT.percent;
  }

  if (countCamera > OptionDiscountOnCount.FIFTEEN_PERCENT.countCamera) {
    discount += OptionDiscountOnCount.FIFTEEN_PERCENT.percent;
  }

  if (price > OptionDiscountOnPrice.MINIMUM.price && price <= OptionDiscountOnPrice.MEDIUM.price) {
    discount -= OptionDiscountOnPrice.MEDIUM.percent;
  }
  if (price > OptionDiscountOnPrice.MEDIUM.price && price <= OptionDiscountOnPrice.HIGH.price) {
    discount -= OptionDiscountOnPrice.HIGH.percent;
  }
  if (price > OptionDiscountOnPrice.MAXIMUM.price) {
    discount -= OptionDiscountOnPrice.MAXIMUM.percent;
  }

  discountPrice = Number(price * (discount / 100));
  if (percentCoupon !== 0 && promoPrice) {
    discountPrice += Number(promoPrice * (percentCoupon / 100));
  }

  return Number(discountPrice.toFixed(2));
}

export function createListIdCount(id: number, count: number) {
  const listIdCount = getDataLocalStorage(KeyLocalStorage.ID_COUNT);
  let idCountCameras: TIdCount | null = null;

  if (listIdCount === null || listIdCount === '' || listIdCount === '{}') {
    idCountCameras = {[id]: count};
    saveDataLocalStorage(KeyLocalStorage.ID_COUNT, idCountCameras);
    return;
  }
  idCountCameras = JSON.parse(listIdCount) as TIdCount;

  idCountCameras[id] = count;
  saveDataLocalStorage(KeyLocalStorage.ID_COUNT, idCountCameras);
}

export function removeIdCount(id: number) {
  const idCount = getDataLocalStorage(KeyLocalStorage.ID_COUNT);
  let idCountCameras: TIdCount | null = null;

  if (idCount === null || idCount === '') {
    return;
  }
  idCountCameras = JSON.parse(idCount) as TIdCount;
  delete idCountCameras[id];
  if (Object.keys(idCountCameras).length === 0) {
    localStorage.removeItem(KeyLocalStorage.ID_COUNT);
    return;
  }
  saveDataLocalStorage(KeyLocalStorage.ID_COUNT, idCountCameras);
}

export function validationOfCoupon(coupon: string) {
  let validCoupon = '';
  for (const iterator of coupon) {
    if (iterator !== ' ') {
      validCoupon += iterator;
    }
  }

  return validCoupon;
}
