import { Link } from 'react-router-dom';
import { TProduct } from '../../types/product';
import { AppRoute, OptionsStars, TypeButton,} from '../../const';
import ListStars from '../list-stars/list-stars';
import ButtonAddBasket from '../button-add-basket/button-add-basket';

type TProductCard = {
  camera: TProduct;
  isSimilar?: boolean;
}

export default function ProductCard({ camera, isSimilar }: TProductCard) {
  return (
    <div className={`product-card ${isSimilar ? 'is-active' : ''}`} data-testid={'product-card'}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
          <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} width={280} height={240} alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <ListStars countStar={camera.rating} optionsStars={OptionsStars.PRODUCT} countComments={camera.reviewCount} />
        <p className="product-card__title">{`${camera.category} ${camera.name}`}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {`${camera.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <ButtonAddBasket camera={camera} typeButtons={TypeButton.CARD}/>
        <Link tabIndex={0} className="btn btn--transparent" to={`${AppRoute.CAMERA}/${camera.id}`}>
          Подробнее
        </Link>
      </div>
    </div>

  );
}
