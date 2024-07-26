import BreadcrumbsList from '../../components/breadcrumbs-list/breadcrumbs-list';
import Container from '../../components/container/container';
import { BreadcrumbsName, KeyLocalStorage } from '../../const';
import { getDataLocalStorage } from '../../utils/utils';
import BasketList from '../basket-list/basket-list';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { camerasSelectors } from '../../store/slice/catalog/catalog-selectros';
import { TProduct } from '../../types/product';
import { useEffect, useState } from 'react';
import { fetchCamerasProduct, fetchGetPromos } from '../../store/api-action';
import { basketActions } from '../../store/slice/basket/basket';
import { listIdCamerasBasketSelectors } from '../../store/slice/basket/basket-selectors';
import BasketSummary from '../../components/basket-summary/basket-summary';
import { promosSelectors } from '../../store/slice/promo/promo-selectors';
import { TIdCount } from '../../types/id-count';

export default function BasketPage() {
  const listIdBasket = getDataLocalStorage(KeyLocalStorage.BASKET);
  const selector = useAppSelector;
  const listIdCamerasBasket = selector(listIdCamerasBasketSelectors);
  const dispatch = useAppDispatch();
  const [camerasBasket, setCamerasBasket] = useState<null | TProduct[]>(null);
  const cameras = selector(camerasSelectors);
  const promoCameras = selector(promosSelectors);
  useEffect(() => {
    dispatch(fetchCamerasProduct());
    dispatch(fetchGetPromos());
  }, []);
  useEffect(() => {
    const idCount = getDataLocalStorage(KeyLocalStorage.ID_COUNT);
    let listIdCount: TIdCount | null = null;
    if (idCount) {
      listIdCount = JSON.parse(idCount) as TIdCount;
    }

    if (listIdBasket && cameras !== null && promoCameras !== null) {
      dispatch(basketActions.saveCameraBasket({listId: listIdBasket}));
      dispatch(basketActions.installTotalPrice({cameras, promoCameras, listIdCount}));
    }

    return () => {
      dispatch(basketActions.clearPrice());
    };
  }, [cameras, promoCameras]);

  useEffect(() => {
    if (cameras && listIdBasket) {
      const listNumberIdBasket = listIdBasket.split(',').map(Number);
      setCamerasBasket(cameras.filter((camera) => listNumberIdBasket.includes(camera.id)));
    }
  }, [cameras, listIdCamerasBasket]);

  return(
    <Container>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <BreadcrumbsList name={BreadcrumbsName.BASKET}/>
          </div>
        </div>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            {listIdCamerasBasket !== '' && listIdCamerasBasket && camerasBasket
            &&
            <BasketList cameras={camerasBasket}/>}
            <BasketSummary />
          </div>
        </section>
      </div>
    </Container>
  );
}
