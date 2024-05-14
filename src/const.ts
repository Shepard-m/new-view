export const AppRoute = {
  CATALOG: '/',
  CAMERA: '/camera',
};
export const ApiRoute = {
  CAMERAS: '/cameras',
  REVIEWS: '/reviews',
  PROMO: 'promo',
  SIMILAR: 'similar',
};

export const RequestStatus = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILED: 'failed',
  NONE: 'none'
};

export const COUNT_STAR = 5;
export const STEP_ADD_REVIEWS = 3;
export const STEP_SLIDERS_SIMILAR = 3;
export const VALIDATION_FORM_REG = /^((\+?7|\s?8)[-(]?\d{3}[-)\s]?)(\d{3}[-\s]?)(\d{2}[-\s]?)(\d{2})$/;

export const OptionsStars = {
  PRODUCT: {
    class: 'product',
    isText: true
  },
  REVIEWS: {
    class: 'review',
    isText: false
  }
};

export const scrollLock = 'scroll-lock';

export const TextError = {
  PHONE: 'некорректный телефон',
};
