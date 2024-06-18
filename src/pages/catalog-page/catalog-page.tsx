import { useEffect, useState } from 'react';
import CatalogProducts from '../../components/catalog-products/catalog-products';
import Container from '../../components/container/container';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { fetchCamerasProduct } from '../../store/api-action';
import { Link } from 'react-router-dom';
import { AppRoute, TextError } from '../../const';
import PromosCameras from '../../components/promos-cameras/promos-cameras';
import { toast } from 'react-toastify';
import ErrorServer from '../../components/error-server/error-server';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector((state) => state.catalog.cameras);
  const [isServerError, setServerError] = useState(false);
  useEffect(() => {
    dispatch(fetchCamerasProduct())
      .unwrap()
      .catch(() => {
        toast.error(TextError.SERVER);
        setServerError(true);
      });
  }, []);

  return (
    <Container>
      {cameras === null && isServerError ? <ErrorServer />
        :
        <div data-testid={'catalog-page'}>
          <PromosCameras />
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.CATALOG}>
                      Главная
                      <svg width={5} height={8} aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini" />
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от" />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input type="number" name="priceUp" placeholder="до" />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-radio catalog-filter__item">
                          <label>
                            <input type="radio" name="category" defaultValue="photocamera" defaultChecked /><span className="custom-radio__icon" /><span className="custom-radio__label">Фотокамера</span>
                          </label>
                        </div>
                        <div className="custom-radio catalog-filter__item">
                          <label>
                            <input type="radio" name="category" defaultValue="videocamera" /><span className="custom-radio__icon" /><span className="custom-radio__label">Видеокамера</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="digital" defaultChecked /><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film" disabled /><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Плёночная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot" /><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Моментальная</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="collection" defaultChecked disabled /><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Коллекционная</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero" defaultChecked /><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional" /><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Любительский</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional" /><span className="custom-checkbox__icon" /><span className="custom-checkbox__label">Профессиональный</span>
                          </label>
                        </div>
                      </fieldset>
                      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                      </button>
                    </form>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <form action="#">
                        <div className="catalog-sort__inner">
                          <p className="title title--h5">Сортировать:</p>
                          <div className="catalog-sort__type">
                            <div className="catalog-sort__btn-text">
                              <input type="radio" id="sortPrice" name="sort" defaultChecked />
                              <label htmlFor="sortPrice">по цене</label>
                            </div>
                            <div className="catalog-sort__btn-text">
                              <input type="radio" id="sortPopular" name="sort" />
                              <label htmlFor="sortPopular">по популярности</label>
                            </div>
                          </div>
                          <div className="catalog-sort__order">
                            <div className="catalog-sort__btn catalog-sort__btn--up">
                              <input type="radio" id="up" name="sort-icon" defaultChecked aria-label="По возрастанию" />
                              <label htmlFor="up">
                                <svg width={16} height={14} aria-hidden="true">
                                  <use xlinkHref="#icon-sort" />
                                </svg>
                              </label>
                            </div>
                            <div className="catalog-sort__btn catalog-sort__btn--down">
                              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" />
                              <label htmlFor="down">
                                <svg width={16} height={14} aria-hidden="true">
                                  <use xlinkHref="#icon-sort" />
                                </svg>
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    <CatalogProducts cameras={cameras} />
                    {/*<div class="pagination">
                  <ul class="pagination__list">
                    <li class="pagination__item"><a class="pagination__link pagination__link&#45;&#45;active" href="1">1</a>
                    </li>
                    <li class="pagination__item"><a class="pagination__link" href="2">2</a>
                    </li>
                    <li class="pagination__item"><a class="pagination__link" href="3">3</a>
                    </li>
                    <li class="pagination__item"><a class="pagination__link pagination__link&#45;&#45;text" href="2">Далее</a>
                    </li>
                  </ul>
                </div>*/}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>}
    </Container>
  );
}
