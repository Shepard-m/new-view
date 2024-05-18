import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview } from '../types/review';

dayjs.locale('ru');

export const converterData = (data: string) => dayjs(data).format('D MMMM');

export const sortReviewsByDate = (reviews: TReview[]) => [...reviews].sort((a, b) => dayjs(b.createAt).diff(dayjs(a.createAt)));

export const OPTIONS_TABS = {
  OPTIONS: 'options',
  DESCRIPTION: 'description',
};

export const formattingPhone = (tel: string) => {
  let clearTel = '';
  for (let i = 0; i < tel.length; i++) {
    if (tel[i] === '-' ?? tel[i] === ' ') {
      clearTel += '';
      return;
    }
    clearTel += tel[i];
  }
  return clearTel;
};
