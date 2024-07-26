import { Link } from 'react-router-dom';
import { TProduct } from '../../types/product';
import { AppRoute, KeyLocalStorage, TypeButton, scrollLock } from '../../const';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addValueToLocalStorage, createListIdCount, getDataLocalStorage, saveDataLocalStorage } from '../../utils/utils';
import { ButtonCard } from '../buttonsCard/buttons-card';

type TProductCard = {
  camera: TProduct;
  typeButtons: string;
}

const bodyContainer = document.querySelector('body');

export default function ButtonAddBasket({ camera, typeButtons: typeButton }: TProductCard) {
  const listCardInBasket = getDataLocalStorage(KeyLocalStorage.BASKET);
  const url = new URL(window.location.href);
  const countCameras = getDataLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET);
  const urlLink = typeButton === TypeButton.CAMERA_PAGE ? AppRoute.CATALOG : `${url.pathname}${url.search}`;
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [isActiveModalSuccess, setIsActiveModalSuccess] = useState(false);
  const { clearErrors } = useForm<{ phone: string }>();
  const modalOverlay = useRef(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const onCloseModalBuyKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      setIsActiveModal(false);
      document.removeEventListener('keydown', onCloseModalBuyKeyDown);
    }
  };

  const handleTabKey = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab' && modalContentRef.current) {
      const focusableElements = modalContentRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (evt.shiftKey) {
        if (document.activeElement === firstElement) {
          evt.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          evt.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  const onCloseModalClick = (evt: MouseEvent) => {
    if (evt.target === modalOverlay.current) {
      bodyContainer?.classList.remove(scrollLock);
      setIsActiveModal(false);
      document.removeEventListener('click', onCloseModalClick);
      document.removeEventListener('keydown', onCloseModalBuyKeyDown);
      document.removeEventListener('keydown', onCloseModalBuyKeyDown);
    }
  };
  useEffect(() => {
    if (isActiveModal && bodyContainer !== null) {
      bodyContainer.classList.add(scrollLock);
      document.addEventListener('click', onCloseModalClick);
      document.addEventListener('keydown', handleTabKey);
    } else {
      bodyContainer?.classList.remove(scrollLock);
      document.removeEventListener('click', onCloseModalClick);
      document.removeEventListener('keydown', handleTabKey);
    }
    clearErrors();
  }, [isActiveModal]);

  function onOpenModalBuyClick() {
    setIsActiveModal(true);
    document.addEventListener('keydown', onCloseModalBuyKeyDown);
  }

  function onCloseModalBuyClick() {
    bodyContainer?.removeEventListener('click', onCloseModalClick);
    document.removeEventListener('keydown', onCloseModalBuyKeyDown);
    setIsActiveModal(false);
  }
  function onCloseModalSuccessClick() {
    setIsActiveModalSuccess(false);
  }

  function onAddBasketSubmit() {
    setIsActiveModal(false);
    setIsActiveModalSuccess(true);
    bodyContainer?.removeEventListener('click', onCloseModalClick);
    document.removeEventListener('keydown', onCloseModalBuyKeyDown);
    addValueToLocalStorage(KeyLocalStorage.BASKET, camera.id.toString());
    if (countCameras) {
      saveDataLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET, +countCameras + 1);
    }else {
      saveDataLocalStorage(KeyLocalStorage.COUNT_CAMERAS_BASKET, 1);
    }
    createListIdCount(camera.id, 1);
  }

  return (
    <>
      {typeButton === TypeButton.CARD
        ?
        <ButtonCard listCardInBasket={listCardInBasket} camera={camera} typeButton={typeButton} onOpenModalBuyClick={onOpenModalBuyClick}/>
        :
        <button className="btn btn--purple" type="button" onClick={onOpenModalBuyClick}>
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref='#icon-add-basket' />
          </svg>
            Добавить в корзину
        </button>}
      {isActiveModal
        &&
        <div className={`modal ${isActiveModal ? 'is-active' : ''}`} >
          <div className="modal__wrapper">
            <div className="modal__overlay" ref={modalOverlay} />
            <div className="modal__content" ref={modalContentRef}>
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
              <div className="modal__buttons">
                <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onAddBasketSubmit}
                >
                  <svg width={24} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-add-basket" />
                  </svg>
                  Добавить в корзину
                </button>
              </div>
              <button tabIndex={0} className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModalBuyClick}>
                <svg width={10} height={10} aria-hidden="true">
                  <use xlinkHref="#icon-close" />
                </svg>
              </button>
            </div>
          </div>
        </div>}
      {isActiveModalSuccess &&
        <div className="modal is-active modal--narrow">
          <div className="modal__wrapper">
            <div className="modal__overlay" />
            <div className="modal__content">
              <p className="title title--h4">Товар успешно добавлен в корзину</p>
              <svg className="modal__icon" width={86} height={80} aria-hidden="true">
                <use xlinkHref="#icon-success" />
              </svg>
              <div className="modal__buttons">
                <Link className="btn btn--transparent modal__btn" to={urlLink} onClick={onCloseModalSuccessClick}>
                  Продолжить покупки
                </Link>
                <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.BASKET}>Перейти в корзину</Link>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModalSuccessClick}>
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
