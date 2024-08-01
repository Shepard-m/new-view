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
  let listIdNumber: number[] = [];
  if (listCardInBasket) {
    listIdNumber = listCardInBasket.split(',').map(Number);
  }

  if (listIdNumber.includes(camera.id) && typeButton !== TypeButton.CAMERA_PAGE) {
    return (
      <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" data-testid={'button-card'} to={AppRoute.BASKET}>
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket" />
        </svg>
        В корзине
      </Link>
    );
  }
  return (
    <button className="btn btn--purple product-card__btn" type="button" data-testid={'button-card'} onClick={onOpenModalBuyClick}>
      Купить
    </button>
  );
}
