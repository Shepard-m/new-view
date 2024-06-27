import { Price } from './price';

export type filterSettings = {
  price: Price;
  category: string | null;
  type: string[] | null;
  level: string[] | null;
  disabledType: string[] | null;
  placeholderPrice: {
    from: number;
    to: number;
  };
};
