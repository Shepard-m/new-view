import { Link } from 'react-router-dom';
import { TProduct } from '../types/product';
import { AppRoute, OptionsStars, TextError, VALIDATION_FORM_REG, scrollLock } from '../const';
import { useEffect, useRef, useState } from 'react';
import ListStars from './list-stars';
import { useForm } from 'react-hook-form';

type TProductCard = {
  camera: TProduct;
  isSimilar?: boolean;
}

export default function ProductCard({ camera, isSimilar }: TProductCard) {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<{ phone: string }>();
  const modalOverlay = useRef(null);
  useEffect(() => {
    const bodyContainer = document.querySelector('body');
    const onCloseModalClick = (evt: MouseEvent) => {
      if (evt.target === modalOverlay.current) {
        bodyContainer?.classList.remove(scrollLock);
        setIsActiveModal(false);
      }
    };
    if (isActiveModal && bodyContainer !== null) {
      bodyContainer.classList.add(scrollLock);
      document.addEventListener('click', onCloseModalClick);
    } else {
      bodyContainer?.classList.remove(scrollLock);
      document.removeEventListener('click', onCloseModalClick);
    }
  }, [isActiveModal]);

  const onCloseModalBuyKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setIsActiveModal(false);
      document.removeEventListener('keydown', onCloseModalBuyKeyDown);
    }
  };

  function onOpenModalBuyClick() {
    setIsActiveModal(true);
    document.addEventListener('keydown', onCloseModalBuyKeyDown);
  }

  function onAddBasketSubmit() {
  }

  function onCloseModalBuyClick() {
    document.removeEventListener('keydown', onCloseModalBuyKeyDown);
    setIsActiveModal(false);
  }

  if (!isActiveModal) {

    document.removeEventListener('keydown', onCloseModalBuyKeyDown);
    document.removeEventListener('keydown', onCloseModalBuyKeyDown);
  }

  return (
    <>
      <div className={`product-card ${isSimilar ? 'is-active' : ''}`}>
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
            <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} width={280} height={240} alt={camera.name} />
          </picture>
        </div>
        <div className="product-card__info">
          <ListStars countStar={camera.rating} optionsStars={OptionsStars.PRODUCT} countComments={camera.reviewCount} />
          <p className="product-card__title">{`${camera.category} ${camera.name}`}</p>
          <p className="product-card__price">
            <span className="visually-hidden">Цена:</span>
            {`${camera.price} ₽`}
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button" onClick={onOpenModalBuyClick}>
            Купить
          </button>
          <Link className="btn btn--transparent" to={`${AppRoute.CAMERA}/${camera.id}`}>
            Подробнее
          </Link>
        </div>
      </div>
      {isActiveModal
        &&
        <div className={`modal ${isActiveModal ? 'is-active' : ''}`} >
          <div className="modal__wrapper">
            <div className="modal__overlay" ref={modalOverlay} />
            <div className="modal__content">
              <p className="title title--h4">Свяжитесь со мной</p>
              <div className="basket-item basket-item--short">
                <div className="basket-item__img">
                  <picture>
                    <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
                    <img src={`/${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} alt={`${camera.category} «${camera.name}»`} />
                  </picture>
                </div>
                <div className="basket-item__description">
                  <p className="basket-item__title">{camera.name}</p>
                  <ul className="basket-item__list">
                    <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
                    </li>
                    <li className="basket-item__list-item">{camera.type} {camera.category}</li>
                    <li className="basket-item__list-item">{camera.level} уровень</li>
                  </ul>
                  <p className="basket-item__price">
                    <span className="visually-hidden">Цена:</span>
                    {camera.price} ₽
                  </p>
                </div>
              </div>
              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Телефон
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input type="tel" placeholder="Введите ваш номер" tabIndex={0} required {...register('phone', {
                    required: TextError.PHONE,
                    pattern: {
                      value: VALIDATION_FORM_REG,
                      message: TextError.PHONE
                    }
                  })}
                  />
                  {errors?.phone &&
                    <span style={{ color: 'red' }}> {errors.phone.message} </span>}
                </label>
                <p className="custom-input__error">Нужно указать номер</p>
              </div>
              <div className="modal__buttons">
                <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" tabIndex={0} onClick={(event) =>
                  void handleSubmit(onAddBasketSubmit)(event)}
                >
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>
                  Заказать
                </button>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" tabIndex={0} onClick={onCloseModalBuyClick}>
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
