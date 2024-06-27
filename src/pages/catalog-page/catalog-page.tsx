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
import { FilterCatalog } from '../../components/filter/filter-catalog';
import { filterCamerasSelectors } from '../../store/slice/catalog/catalog-selectros';
import CatalogSort from '../../components/catalog-sort/catalog-sort';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const filterCameras = useAppSelector(filterCamerasSelectors);
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
      {filterCameras === null && isServerError ? <ErrorServer />
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
                  <FilterCatalog />
                  <div className="catalog__content">
                    <CatalogSort />
                    <CatalogProducts cameras={filterCameras} />
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
