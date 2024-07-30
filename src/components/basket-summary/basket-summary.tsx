import { useEffect, useState } from 'react';
import { AppRoute, KeyLocalStorage, RequestStatus, scrollLock, TextError } from '../../const';
import { fetchPostOrder } from '../../store/api-action';
import { discountPriceSelectors, listIdCamerasBasketSelectors, totalPriceSelectors } from '../../store/slice/basket/basket-selectors';
import { orderStatusSelectors } from '../../store/slice/order/ordersSelectors';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { basketActions } from '../../store/slice/basket/basket';
import { clearValueToLocalStorage, getDataLocalStorage } from '../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../loader/loader';
import { BasketPromoCode } from '../basket-promo-code/basket-promo-сode';
import { TIdCount } from '../../types/id-count';

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
    const promoCode = getDataLocalStorage(KeyLocalStorage.COUPON);
    let coupon = null;
    if (promoCode) {
      coupon = Object.keys((JSON.parse(promoCode) as TIdCount))[0];
    }
    if (listIdCamerasBasket) {
      const camerasIds = listIdCamerasBasket.split(',').map(Number);
      dispatch(fetchPostOrder({camerasIds, coupon}))
        .unwrap()
        .then(() => {
          const dataValueStorage = Object.values(KeyLocalStorage);
          setIsActiveModal(true);
          for (const value of dataValueStorage) {
            clearValueToLocalStorage(value);
          }
          dispatch(basketActions.clearBasket());
        })
        .catch(() => {
          toast.error(TextError.ORDER);
        });
    }
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
      <div className="basket__summary" data-testid={'basket-summary'}>
        <div className="basket__promo">
          <BasketPromoCode />
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
              <Link className="btn btn--purple modal__btn modal__btn--fit-width" type="button" to={AppRoute.CATALOG}>
                Вернуться к покупкам
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
