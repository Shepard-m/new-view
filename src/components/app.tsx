import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import CatalogPage from '../pages/catalog-page';
import CameraPage from '../pages/camera-page';

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
      </Route>
    </Routes>
  );
}
