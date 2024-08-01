import { SyntheticEvent, useEffect, useState } from 'react';
import { basketActions } from '../../store/slice/basket/basket';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { TProduct } from '../../types/product';
import { AppRoute, ArithmeticSigns , KeyLocalStorage, optionCountCamerasBasket, RequestStatus } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import { orderStatusSelectors } from '../../store/slice/order/ordersSelectors';
import { clearValueToLocalStorage, createListIdCount, getDataLocalStorage, removeIdCount, removeValueToLocalStorage, saveDataLocalStorage } from '../../utils/utils';
import { TIdCount } from '../../types/id-count';
import { statusBasketSelectors } from '../../store/slice/basket/basket-selectors';

type TBasketItem = {
  camera: TProduct;
}

export default function BasketItem({ camera }: TBasketItem) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const navigate = useNavigate();
  const orderStatus = selector(orderStatusSelectors);
  const statusBasket = selector(statusBasketSelectors);
  const [countCamera, setCountCamera] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(camera.price);

  useEffect(() => {
    setTotalPrice(camera.price * countCamera);
  }, [countCamera]);

  useEffect(() => {
    const idCount = getDataLocalStorage(KeyLocalStorage.ID_COUNT);
    let listIdCount: TIdCount | null = null;
    if (idCount) {
      listIdCount = JSON.parse(idCount) as TIdCount;
      for (const key in listIdCount) {
        if (+key === camera.id) {
          setCountCamera(listIdCount[camera.id]);
          setTotalPrice(camera.price * listIdCount[camera.id]);
        }
      }
    }
  }, []);

  function onRemoveCameraClick() {
    const countBasketCamera = getDataLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET);
    removeValueToLocalStorage(KeyLocalStorage.BASKET, camera.id);
    dispatch(basketActions.removeCameraBasket({ id: camera.id, count: countCamera, price: totalPrice}));
    const listIdCamerasBasket = getDataLocalStorage(KeyLocalStorage.BASKET);
    removeIdCount(camera.id);
    if (countBasketCamera) {
      saveDataLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET, +countBasketCamera - countCamera);
    }
    setIsModal(false);
    if (listIdCamerasBasket === null) {
      navigate(AppRoute.CATALOG);
      clearValueToLocalStorage(KeyLocalStorage.COUPON);
      dispatch(basketActions.clearBasket);
    }
  }

  function onNextCountCamera() {
    if (countCamera < 9) {
      createListIdCount(camera.id, countCamera + 1);
      dispatch(basketActions.changeTotalPrice({price: camera.price, sign: ArithmeticSigns.PLUS, count: 1, id: camera.id}));
      setCountCamera(countCamera + 1);
    }
  }

  function onInputCountCamerasChange(evt: SyntheticEvent<HTMLInputElement>) {
    let countValue = evt.currentTarget.value.slice(1,2);
    if (+countValue === countCamera) {
      return;
    }
    const oldPrice = camera.price * countCamera;
    let count = countCamera;
    if (countValue === '') {
      countValue = optionCountCamerasBasket.MIN.toString();
      count = 1;
    }

    if (countValue === '0') {
      countValue = optionCountCamerasBasket.MIN.toString();
      count = 1;
    }

    setCountCamera(+countValue);
    createListIdCount(camera.id, +countValue);
    const newPrice = camera.price * +countValue;

    if (oldPrice < newPrice) {
      dispatch(basketActions.changeTotalPrice({price: newPrice - oldPrice, sign: ArithmeticSigns.PLUS, count: +countValue - count, id: camera.id}));
      return;
    }

    dispatch(basketActions.changeTotalPrice({price: oldPrice - newPrice, sign: ArithmeticSigns.SUBTRACTION, count: count - +countValue, id: camera.id}));

  }

  function onOpenModalClick() {
    setIsModal(true);
  }

  function onCloseModalClick() {
    setIsModal(false);
  }

  function onBackCountCameraClick() {
    if (countCamera > 1) {
      createListIdCount(camera.id, countCamera - 1);
      dispatch(basketActions.changeTotalPrice({price: camera.price, sign: ArithmeticSigns.SUBTRACTION, count: 1, id: camera.id}));
      setCountCamera(countCamera + - 1);
    }
  }

  return (
    <>
      <li className="basket-item" data-testid={'basket-item'}>
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
            <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} width={280} height={240} alt={camera.name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{`${camera.category} ${camera.name}`}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">
                Артикул:
              </span>
              <span className="basket-item__number">
                {camera.vendorCode}
              </span>
            </li>
            <li className="basket-item__list-item">{`${camera.type} ${camera.category}`}</li>
            <li className="basket-item__list-item">{camera.level} уровень</li>
          </ul>
        </div>
        <p className="basket-item__price">
          <span className="visually-hidden">
          Цена:
          </span>
          {camera.price} ₽
        </p>
        <div className="quantity">
          <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={onBackCountCameraClick} disabled={orderStatus === RequestStatus.LOADING || statusBasket === RequestStatus.LOADING}>
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter1" />
          <input type="number" id="counter1" value={countCamera} min={1} max={9} aria-label="количество товара" onChange={onInputCountCamerasChange} disabled={orderStatus === RequestStatus.LOADING || statusBasket === RequestStatus.LOADING}/>
          <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={onNextCountCamera} disabled={orderStatus === RequestStatus.LOADING || statusBasket === RequestStatus.LOADING}>
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
        <div className="basket-item__total-price">
          <span className="visually-hidden">
            Общая цена:
          </span>
          {totalPrice} ₽
        </div>
        <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={onOpenModalClick} disabled={orderStatus === RequestStatus.LOADING || statusBasket === RequestStatus.LOADING}>
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
        </button>
      </li>
      {isModal &&
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
                  <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} width={140} height={120} alt={`${camera.category} ${camera.name}`} />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{`${camera.category} ${camera.name}`}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">
                      Артикул:
                    </span>
                    <span className="basket-item__number">
                      {camera.vendorCode}
                    </span>
                  </li>
                  <li className="basket-item__list-item">{`${camera.type} ${camera.category}`}</li>
                  <li className="basket-item__list-item">{camera.level} уровень</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={onRemoveCameraClick}>
                Удалить
              </button>
              <Link className="btn btn--transparent modal__btn modal__btn--half-width" to={AppRoute.CATALOG}>
                Продолжить покупки
              </Link>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModalClick}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>}
    </>
  );
}
