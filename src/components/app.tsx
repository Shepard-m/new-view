import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import CatalogPage from '../pages/catalog-page';
import CameraPage from '../pages/camera-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

export default function App() {
  return (
    <Routes>
      <Route path={AppRoute.CATALOG}>
        <Route
          index
          element={<CatalogPage />}
        />
        <Route
          path={`${AppRoute.CAMERA}/:cameraId`}
          element={<CameraPage />}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}
