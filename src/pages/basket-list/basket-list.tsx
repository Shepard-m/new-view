import BasketItem from '../../components/basket-item/basket-item';
import { TProduct } from '../../types/product';

type TBasketList = {
  cameras: TProduct[];
}

export default function BasketList({ cameras }: TBasketList) {
  return (
    <ul className="basket__list">
      {cameras.map((camera) => <BasketItem key={camera.id} camera={camera}/>)}
    </ul>
  );
}
