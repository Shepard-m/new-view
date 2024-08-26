export const COUNT_STAR = 5;
export const STEP_ADD_REVIEWS = 3;
export const STEP_SLIDERS_SIMILAR = 3;
export const VALIDATION_FORM_REG = /^(8|\+7)\s?[\s(]?9\d{2}[\s)]?\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
export const scrollLock = 'scroll-lock';
export const countCamerasForPage = 9;
export const visibleSizePaginationPage = 3;

export const AppRoute = {
  CATALOG: 'new-view/',
  CAMERA: '/camera',
  NOT_FOUND: '*',
  BASKET: '/card',
};
export const ApiRoute = {
  CAMERAS: '/cameras',
  REVIEWS: '/reviews',
  PROMO: 'promo',
  SIMILAR: 'similar',
  ORDER: 'orders',
  COUPONS: '/coupons',
};

export const RequestStatus = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILED: 'failed',
  NONE: 'none'
};

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

export const FilterType = {
  DIGITAL: 'Цифровая',
  FILM: 'Плёночная',
  SNAPSHOT: 'Моментальная',
  COLLECTION: 'Коллекционная',
};

export const FilterLevel = {
  ZERO: 'Нулевой',
  NON_PROFESSIONAL: 'Любительский',
  PROFESSIONAL: 'Профессиональный',
};

export const FilterCategory = {
  PHOTOCAMERA: {
    value: 'Фотокамера',
    data: 'Фотоаппарат'
  },
  VIDEOCAMERA: {
    value: 'Видеокамера',
    data: 'Видеокамера'
  },
};


export const SettingSort = {
  price: {
    type: 'Price',
    value: 'по цене'
  },
  popularity: {
    type: 'Popularity',
    value: 'по популярности'
  }
};

export const DirectionSorting = {
  TOP: {
    direction: 'top',
    value: 'По возрастанию',
    id: 'up',
  },
  DOWN: {
    direction: 'down',
    value: 'По убыванию',
    id: 'down',
  },
};

export const TextError = {
  PHONE: 'некорректный телефон',
  SERVER: 'ошибка загрузки данных',
  ORDER: 'Произошла  ошибка в формление заказа',
  REVIEW: 'Произошла ошибка отправки отзыва',
};
export const TextSuccess = {
  ORDER: 'Заказ добавлен в корзину',
};

export const OptionUrl = {
  PAGE: 'page',
  PRICE_MIN: 'priceMin',
  PRICE_MAX: 'priceMax',
  CATEGORY_FILTER: 'categoryFilter',
  TYPE_FILTER: 'typeFilter',
  LEVEL_FILTER: 'levelFilter',
  TYPE_SORT: 'typeSort',
  DIRECTION_SORT: 'directionSort',
  TABS_CAMERA: 'tab'
};

export const TypeButton = {
  CARD: 'card',
  CAMERA_PAGE: 'camera'
};

export const KeyLocalStorage = {
  BASKET: 'basket',
  COUNT_CAMERAS_BASKET: 'countCamerasBasket',
  ID_COUNT: 'idCount',
  COUPON: 'coupon',
};

export const BreadcrumbsName = {
  BASKET: 'Корзина',
};

export const ArithmeticSigns = {
  PLUS: '+',
  SUBTRACTION: '-'
};

export const optionCountCamerasBasket = {
  MAX: 9,
  MIN: 1,
};

export const OptionDiscountOnCount = {
  THREE_PERCENT: {
    countCamera: 2,
    percent: 3,
  },
  FIVE_PERCENT: {
    countCamera: 5,
    percent: 5,
  },
  TEN_PERCENT: {
    countCamera: 10,
    percent: 10,
  },
  FIFTEEN_PERCENT: {
    countCamera: 10,
    percent: 15,
  },
};

export const OptionDiscountOnPrice = {
  MINIMUM: {
    price: 10000,
    percent: 0,
  },
  MEDIUM: {
    price: 20000,
    percent: 1,
  },
  HIGH: {
    price: 30000,
    percent: 2,
  },
  MAXIMUM: {
    price: 30000,
    percent: 3,
  },
};

export const ValidCoupon = {
  VALID: 'is-valid',
  INVALID: 'is-invalid',
};

export const OptionsStarReview = {
  GREAT: {
    value: 5,
    text: 'Отлично'
  },
  GOOD: {
    value: 4,
    text: 'Хорошо'
  },
  NORMALLY: {
    value: 3,
    text: 'Нормально'
  },
  BADLY: {
    value: 2,
    text: 'Плохо'
  },
  TERRIBLY: {
    value: 1,
    text: 'Ужасно'
  },
};

export const TextErrorValidationReview = {
  RATING: {
    required: 'Нужно оценить товар'
  },
  NAME: {
    required: 'Нужно указать имя',
    minLength: 'Минимальная длина имени 2 символа',
    maxLength: 'Максимальная длина имени 15 символа',
  },
  PLUS: {
    required: 'Нужно указать достоинства',
    minLength: 'Минимальная длина 10 символа',
    maxLength: 'Максимальная длина 160 символа',
  },
  MINUS: {
    required: 'Нужно указать недостатки',
    minLength: 'Минимальная длина 10 символа',
    maxLength: 'Максимальная длина 160 символа',
  },
  COMMENT: {
    required: 'Нужно добавить комментарий',
    minLength: 'Минимальная длина 10 символа',
    maxLength: 'Максимальная длина 160 символа',
  }
};

export const OptionsValidationReview = {
  NAME: {
    minLength: 2,
    maxLength: 15,
  },
  ADVANTAGES: {
    minLength: 10,
    maxLength: 160,
  },
  COMMENT: {
    minLength: 10,
    maxLength: 160,
  },
};
