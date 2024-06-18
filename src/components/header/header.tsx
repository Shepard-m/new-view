import { Link } from 'react-router-dom';
import { camerasSelectors } from '../../store/slice/catalog/catalog-selectros';
import { AppRoute } from '../../const';
import React, { ChangeEvent, useEffect, MouseEvent, useRef, useState, } from 'react';
import { useAppSelector } from '../../types/indexStore';
import { TProduct } from '../../types/product';

export default function Header() {
  const cameras = useAppSelector(camerasSelectors);
  const formInput = useRef<HTMLInputElement>(null);
  const formListModal = useRef<HTMLLIElement>(null);

  const [valueInput, setValueInput] = useState<string>('');
  const [listCamerasSearch, setListCamerasSearch] = useState<TProduct[]>([]);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  function onClearSearchCameras(evt: MouseEvent) {
    if (formInput.current !== evt.target ?? formListModal.current !== evt.target) {
      setTimeout(() => {
        setIsListOpen(false);
        setValueInput('');
      }, 500);
      console.log(evt.target, formInput.current, formListModal.current);
    }
  }

  useEffect(() => {
    if (cameras !== null && valueInput.length >= 3) {
      setIsListOpen(true);
      setListCamerasSearch([...cameras].filter((camera) => camera.name.toLowerCase().includes(valueInput.toLowerCase())));
    } else if (valueInput.length < 3) {
      setIsListOpen(false);
    }
    window.addEventListener('mousedown', onClearSearchCameras);

    return () => {
      window.removeEventListener('mousedown', onClearSearchCameras);
    };
  }, [valueInput, cameras]);

  function onSelectCamera() {
    setIsListOpen(false);
    setValueInput('');
  }

  function onSearchCameras(evt: ChangeEvent<HTMLInputElement>) {
    setValueInput(evt.target.value);
  }

  return (
    <header className="header" id="header" data-testid={'header'}>
      <div className="container">
        <Link className="header__logo" to={AppRoute.CATALOG} aria-label="Переход на главную">
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.CATALOG}>Каталог</Link>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className={`form-search ${isListOpen ? 'list-opened' : ''}`}>
          <form>
            <label>
              <svg className="form-search__icon" width={16} height={16} aria-hidden="true">
                <use xlinkHref="#icon-lens" />
              </svg>
              <input className="form-search__input" value={valueInput} type="text" autoComplete="off" placeholder="Поиск по сайту" ref={formInput} onChange={onSearchCameras} />
            </label>
            <ul className="form-search__select-list">
              {listCamerasSearch?.map((camera) => <Link key={camera.id} tabIndex={-1} to={`${AppRoute.CAMERA}/${camera.id}`}><li ref={formListModal} className="form-search__select-item" onClick={onSelectCamera} tabIndex={0}>{camera.name}</li></Link>)}
            </ul>
          </form>
          <button className="form-search__reset" type="reset" onClick={onClearSearchCameras}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">
              Сбросить поиск
            </span>
          </button>
        </div>
        <a className="header__basket-link" href="#">
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="header__basket-count">
            3
          </span>
        </a>
      </div>
    </header>
  );
}
