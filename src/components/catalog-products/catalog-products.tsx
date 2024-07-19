import { TProduct } from '../../types/product';
import CatalogEmpty from '../catalog-empty/catalog-empty';
import ProductCard from '../product-card/product-card';

type TCatalogProducts = {
  cameras: TProduct[] | null;
}

export default function CatalogProducts({ cameras }: TCatalogProducts) {
  if (cameras === null) {
    return <div></div>;
  }
  return (cameras.length === 0 ? <CatalogEmpty /> :
    <div className="cards catalog__cards" data-testid={'CatalogProducts'}>
      {cameras.map((camera) => <ProductCard key={camera.id} camera={camera} />)}
    </div>
  );
}
