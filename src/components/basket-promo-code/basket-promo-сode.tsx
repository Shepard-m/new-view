import { SyntheticEvent, useEffect, useState } from 'react';
import { fetchPostCoupons } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { percentCouponSelectors, statusBasketSelectors } from '../../store/slice/basket/basket-selectors';
import { KeyLocalStorage, RequestStatus, ValidCoupon } from '../../const';
import Loader from '../loader/loader';
import { orderStatusSelectors } from '../../store/slice/order/ordersSelectors';
import { clearValueToLocalStorage, getDataLocalStorage, saveDataLocalStorage, validationOfCoupon } from '../../utils/utils';
import { basketActions } from '../../store/slice/basket/basket';

export function BasketPromoCode() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const percentCoupon = selector(percentCouponSelectors);
  const statusBasket = selector(statusBasketSelectors);
  const orderStatus = selector(orderStatusSelectors);
  const [validCoupon, setValidCoupon] = useState('');
  const [coupon, setCoupon] = useState<string>('');

  useEffect(() => {
    const dataCoupon = getDataLocalStorage(KeyLocalStorage.COUPON);
    if (dataCoupon) {
      const dataParse = JSON.parse(dataCoupon) as {[key: string]: number};
      const keyCoupon = Object.keys(dataParse).find((key) => dataParse[key]);
      setValidCoupon(ValidCoupon.VALID);
      setCoupon(keyCoupon as string);
    }
  }, []);

  useEffect(() => {
    if (percentCoupon !== 0 && coupon !== '') {
      saveDataLocalStorage(KeyLocalStorage.COUPON, {[coupon]: percentCoupon});
    }

    dispatch(basketActions.applicationCoupon({percent: percentCoupon}));
  }, [percentCoupon]);

  function onSendCouponClick(evt: SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(fetchPostCoupons(coupon))
      .unwrap()
      .then(() => {
        setValidCoupon(ValidCoupon.VALID);
      })
      .catch(() => {
        setValidCoupon(ValidCoupon.INVALID);
        clearValueToLocalStorage(KeyLocalStorage.COUPON);
      });
  }

  function onInputCouponChange(evt: SyntheticEvent<HTMLInputElement>) {
    const copyCoupon = validationOfCoupon(evt.currentTarget.value);
    setCoupon(copyCoupon);
    setValidCoupon('');
  }

  return (
    <>
      <p className="title title--h4" data-testid={'basket-promo-code'}>Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action='#' onSubmit={onSendCouponClick}>
          <div className={`custom-input ${validCoupon}`}>
            <label className=''>
              <span className="custom-input__label">Промокод</span>
              <input type="text" name="promo" value={coupon} placeholder="Введите промокод" onChange={onInputCouponChange} disabled={statusBasket === RequestStatus.LOADING || orderStatus === RequestStatus.LOADING}/>
            </label>
            {validCoupon === ValidCoupon.VALID
              ? <p className="custom-input__success">Промокод принят!</p>
              : <p className="custom-input__error">Промокод неверный</p>}
          </div>
          <button className="btn" disabled={statusBasket === RequestStatus.LOADING || orderStatus === RequestStatus.LOADING}>
            Применить
          </button>
        </form>
      </div>
      {statusBasket === RequestStatus.LOADING
      && <Loader />}
    </>
  );
}

