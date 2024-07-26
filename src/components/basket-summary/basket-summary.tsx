import { useEffect, useState } from 'react';
import { AppRoute, KeyLocalStorage, RequestStatus, scrollLock, TextError } from '../../const';
import { fetchPostOrder } from '../../store/api-action';
import { discountPriceSelectors, listIdCamerasBasketSelectors, totalPriceSelectors } from '../../store/slice/basket/basket-selectors';
import { orderStatusSelectors } from '../../store/slice/order/ordersSelectors';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { basketActions } from '../../store/slice/basket/basket';
import { clearValueToLocalStorage } from '../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../loader/loader';

export default function BasketSummary() {
  const selector = useAppSelector;
  const dispatch = useAppDispatch();
  const listIdCamerasBasket = selector(listIdCamerasBasketSelectors);
  const totalPrice = selector(totalPriceSelectors);
  const navigate = useNavigate();
  const orderStatus = selector(orderStatusSelectors);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const discountPrice = selector(discountPriceSelectors);

  function onSendOrderClick() {
    if (listIdCamerasBasket) {
      const camerasIds = listIdCamerasBasket.split(',').map(Number);
      dispatch(fetchPostOrder({camerasIds, coupon: null}))
        .unwrap()
        .then(() => {
          setIsActiveModal(true);
          clearValueToLocalStorage(KeyLocalStorage.BASKET);
          clearValueToLocalStorage(KeyLocalStorage.ID_COUNT);
          clearValueToLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET);
          dispatch(basketActions.clearBasket());
        })
        .catch(() => {
          toast.error(TextError.ORDER);
        });
    }
  }

  if (orderStatus === RequestStatus.LOADING) {
    <Loader />;
  }

  function onCloseModalClick() {
    setIsActiveModal(false);
    navigate(AppRoute.CATALOG);
  }

  useEffect(() => {
    const bodyContainer = document.querySelector('body');
    if (isActiveModal && bodyContainer) {
      bodyContainer.classList.add(scrollLock);
      return;
    }

    bodyContainer?.classList.remove(scrollLock);
  }, [isActiveModal]);

  return (
    <>
      <div className="basket__summary">
        <div className="basket__promo">
          {/*<p class="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
            <div class="basket-form">
              <form action="#">
                <div class="custom-input">
                  <label><span class="custom-input__label">Промокод</span>
                    <input type="text" name="promo" placeholder="Введите промокод">
                  </label>
                  <p class="custom-input__error">Промокод неверный</p>
                  <p class="custom-input__success">Промокод принят!</p>
                </div>
                <button class="btn" type="submit">Применить
                </button>
              </form>
            </div>*/}
        </div>
        <div className="basket__summary-order">
          <p className="basket__summary-item">
            <span className="basket__summary-text">
              Всего:
            </span>
            <span className="basket__summary-value">
              {totalPrice} ₽
            </span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text">
              Скидка:
            </span>
            <span className="basket__summary-value basket__summary-value--bonus">
              {discountPrice} ₽
            </span>
          </p>
          <p className="basket__summary-item">
            <span className="basket__summary-text basket__summary-text--total">
              К оплате:
            </span>
            <span className="basket__summary-value basket__summary-value--total">
              {totalPrice - discountPrice} ₽
            </span>
          </p>
          <button className="btn btn--purple" type="submit" disabled={orderStatus === RequestStatus.LOADING || listIdCamerasBasket === '' || listIdCamerasBasket === null} onClick={onSendOrderClick}>
            Оформить заказ
          </button>
        </div>
      </div>
      <div />
      {isActiveModal
      &&
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width={80} height={78} aria-hidden="true">
              <use xlinkHref="#icon-review-success" />
            </svg>
            <div className="modal__buttons">
              <Link className="btn btn--purple modal__btn modal__btn--fit-width" type="button" to={AppRoute.CATALOG}>Вернуться к покупкам
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
      {orderStatus === RequestStatus.LOADING &&
       <Loader />}
    </>
  );
}
