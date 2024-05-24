import { TProduct } from '../../types/product';
import ProductCard from '../product-card/product-card';

type TCatalogProducts = {
  cameras: TProduct[] | null;
}

export default function CatalogProducts({ cameras }: TCatalogProducts) {
  if (cameras === null) {
    return '';
  }
  return (
    <div className="cards catalog__cards" data-testid={'CatalogProducts'}>
      {cameras.map((camera) => <ProductCard key={camera.id} camera={camera} />)}
    </div>
  );
}
