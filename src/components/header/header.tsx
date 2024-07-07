import { Link, useNavigate } from 'react-router-dom';
import { camerasSelectors } from '../../store/slice/catalog/catalog-selectros';
import { AppRoute } from '../../const';
import { ChangeEvent, useEffect, MouseEvent, useRef, useState, KeyboardEvent, SyntheticEvent, } from 'react';
import { useAppSelector } from '../../types/indexStore';
import { TProduct } from '../../types/product';

export default function Header() {
  const cameras = useAppSelector(camerasSelectors);
  const formInput = useRef<HTMLInputElement>(null);
  const formLiElement = useRef<HTMLLIElement>(null);
  const formUlModal = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const [currentFocusIndex, setCurrentFocusIndex] = useState(-1);
  const [valueInput, setValueInput] = useState<string>('');
  const [listCamerasSearch, setListCamerasSearch] = useState<TProduct[]>([]);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  function onClearSearchCameras(evt: MouseEvent) {
    const target = evt.target as HTMLElement;

    if (formInput.current !== target && formLiElement.current !== target && !target.classList.contains('form-search__select-item')) {
      setIsListOpen(false);
      setValueInput('');
      setCurrentFocusIndex(-1);
    }

    if (formUlModal.current !== null) {
      formUlModal.current.scrollTop = 0;
    }
  }

  useEffect(() => {
    if (cameras !== null && valueInput.length >= 3) {
      setIsListOpen(true);
      setListCamerasSearch([...cameras].filter((camera) => camera.name.toLowerCase().includes(valueInput.toLowerCase())));
    }
    if (valueInput.length < 3) {
      setIsListOpen(false);
    }
    document.addEventListener('mouseup', onClearSearchCameras as unknown as EventListener);

    return () => {
      document.removeEventListener('mouseup', onClearSearchCameras as unknown as EventListener);
    };
  }, [valueInput, cameras]);

  function onSelectCameraKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (event.code === 'Enter' && event.currentTarget.dataset.id !== undefined) {
      navigate(`${AppRoute.CAMERA}/${event.currentTarget.dataset.id}`);
      setIsListOpen(false);
      setValueInput('');
    }
  }

  function onSelectCameraClick(evt: SyntheticEvent<HTMLLIElement>) {
    if (evt.currentTarget.dataset.id !== undefined) {
      setIsListOpen(false);
      setValueInput('');
      navigate(`${AppRoute.CAMERA}/${evt.currentTarget.dataset.id}`);
    }
  }

  function onSearchCamerasChange(evt: ChangeEvent<HTMLInputElement>) {
    setValueInput(evt.target.value);
  }

  const onArrowKeyDown = (evt: KeyboardEvent<HTMLInputElement | HTMLUListElement>) => {
    if (evt.key === 'ArrowDown') {
      setCurrentFocusIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex < listCamerasSearch.length ? nextIndex : 0;
      });
    } else if (evt.key === 'ArrowUp') {
      setCurrentFocusIndex((prev) => {
        const prevIndex = prev - 1;
        return prevIndex >= 0 ? prevIndex : listCamerasSearch.length - 1;
      });
    } else if (evt.key === 'Tab') {
      evt.preventDefault();
      setCurrentFocusIndex((prev) => (prev + 1) % listCamerasSearch.length);
    }
  };

  useEffect(() => {
    if (currentFocusIndex >= 0 && formUlModal.current) {
      const listItems = formUlModal.current.querySelectorAll('li');
      if (listItems[currentFocusIndex]) {
        listItems[currentFocusIndex].focus();
      }
    }
  }, [currentFocusIndex]);

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
              <input className="form-search__input" value={valueInput} type="text" autoComplete="off" placeholder="Поиск по сайту" ref={formInput} onChange={onSearchCamerasChange} onKeyDown={onArrowKeyDown} />
            </label>
            <ul className="form-search__select-list" ref={formUlModal} onKeyDown={onArrowKeyDown}>
              {listCamerasSearch?.map((camera) => <li key={camera.id} data-id={camera.id} ref={formLiElement} className="form-search__select-item" onKeyDown={onSelectCameraKeyDown} onClick={onSelectCameraClick} tabIndex={0}>{camera.name}</li>)}
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
