import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview } from '../types/review';
import { TProduct } from '../types/product';

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

export const sortingSimilarList = (similarProducts: TProduct[]) => {
  const copySimilar = [...similarProducts];
  if (similarProducts !== null) {
    copySimilar.sort((a: TProduct, b: TProduct) => a.type.localeCompare(b.type));
    copySimilar.sort((a: TProduct, b: TProduct) => a.level.localeCompare(b.level));
    copySimilar.sort((a: TProduct, b: TProduct) => a.category.localeCompare(b.category));
  }
  return copySimilar;
};
