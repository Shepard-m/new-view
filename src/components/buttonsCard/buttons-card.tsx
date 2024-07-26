import { Link } from 'react-router-dom';
import { AppRoute, TypeButton } from '../../const';
import { TProduct } from '../../types/product';

type ButtonCard = {
  listCardInBasket: string | null;
  camera: TProduct;
  typeButton: string;
  onOpenModalBuyClick: () => void;
}

export function ButtonCard({listCardInBasket, camera, typeButton, onOpenModalBuyClick}:ButtonCard) {
  if (listCardInBasket?.includes(camera.id.toString()) && typeButton !== TypeButton.CAMERA_PAGE) {
    return (
      <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.BASKET}>
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket" />
        </svg>
        В корзине
      </Link>
    );
  }
  return (
    <button className="btn btn--purple product-card__btn" type="button" onClick={onOpenModalBuyClick}>
      Купить
    </button>
  );
}
