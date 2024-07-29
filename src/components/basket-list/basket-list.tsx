import BasketItem from '../basket-item/basket-item';
import { TProduct } from '../../types/product';

type TBasketList = {
  cameras: TProduct[];
}

export default function BasketList({ cameras }: TBasketList) {
  return (
    <ul className="basket__list" data-testid={'basket-list'}>
      {cameras.map((camera) => <BasketItem key={camera.id} camera={camera}/>)}
    </ul>
  );
}
