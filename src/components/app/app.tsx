import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import CameraPage from '../../pages/camera-page/camera-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import BasketPage from '../../pages/basket-page/basket-page';

export default function App() {
  return (
    <Routes>
      <Route path={AppRoute.CATALOG}>
        <Route
          path={'/nev-view'}
          element={<CatalogPage />}
        />
        <Route
          path={`${AppRoute.CAMERA}/:cameraId`}
          element={<CameraPage />}
        />
        <Route
          path={AppRoute.NOT_FOUND}
          element={<NotFoundPage />}
        />
        <Route
          path={AppRoute.BASKET}
          element={<BasketPage />}
        />
      </Route>
    </Routes>
  );
}
