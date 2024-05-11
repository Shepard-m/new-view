import { Link } from 'react-router-dom';
import { TProduct } from '../types/product';
import { AppRoute } from '../const';
import { useState } from 'react';

type TProductCard = {
  camera: TProduct;
}

export default function ProductCard({ camera }: TProductCard) {
  const [isActiveModal, setIsActiveModal] = useState(false);

  const onCloseModalBuyKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setIsActiveModal(false);
    }
    window.removeEventListener('keydown', onCloseModalBuyKeyDown);
  };

  function onOpenModalBuyClick() {
    setIsActiveModal(true);
    window.addEventListener('keydown', onCloseModalBuyKeyDown);
  }

  function onCloseModalBuyClick() {
    window.removeEventListener('keydown', onCloseModalBuyKeyDown);
    setIsActiveModal(false);
  }

  return (
    <>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
            <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} width={280} height={240} alt={camera.name} />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>
            <svg width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
            <p className="visually-hidden">Рейтинг: {camera.rating}</p>
            <p className="rate__count">
              <span className="visually-hidden">Всего оценок:</span>
              {camera.reviewCount}
            </p>
          </div>
          <p className="product-card__title">{camera.name}</p>
          <p className="product-card__price">
            <span className="visually-hidden">Цена:</span>
            18 970 ₽
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

      <div className={`modal ${isActiveModal ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content">
            <p className="title title--h4">Свяжитесь со мной</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
                  <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} alt={`${camera.category} «${camera.name}»`} />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{camera.type} {camera.category}</li>
                  <li className="basket-item__list-item">{camera.level} уровень</li>
                </ul>
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
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
                <input type="tel" name="user-tel" placeholder="Введите ваш номер" required />
              </label>
              <p className="custom-input__error">Нужно указать номер</p>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Заказать
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModalBuyClick}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
