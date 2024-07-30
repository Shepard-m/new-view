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
import { filterCamerasSelectors, sliceCamerasByPageSelectors } from '../../store/slice/catalog/catalog-selectros';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import { catalogActions } from '../../store/slice/catalog/catalog';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(sliceCamerasByPageSelectors);
  const filteredListCameras = useAppSelector(filterCamerasSelectors);
  const [isServerError, setServerError] = useState(false);
  useEffect(() => {
    dispatch(fetchCamerasProduct())
      .unwrap()
      .catch(() => {
        toast.error(TextError.SERVER);
        setServerError(true);
      });
    return () => {
      dispatch(catalogActions.clearSorting());
      dispatch(catalogActions.clearFilter());
    };
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
                <h1 className="tit le title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <FilterCatalog />
                  <div className="catalog__content">
                    <CatalogSort />
                    <CatalogProducts cameras={cameras} />
                    {filteredListCameras !== null && filteredListCameras?.length > 9 ? <Pagination/> : ''}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>}
    </Container>
  );
}
