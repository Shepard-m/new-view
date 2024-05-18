import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/indexStore';
import { fetchGetPromos } from '../store/api-action';
import { selectedPromoSelectors, promosSelectors } from '../store/slice/promo/promo-selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import ButtonsPromo from './buttons-promo/buttons-promo';

export default function PromosCameras() {
  const dispatch = useAppDispatch();
  const selectors = useAppSelector;
  const promo = selectors(selectedPromoSelectors);
  const promos = selectors(promosSelectors);


  useEffect(() => {
    if (promos === null) {
      dispatch(fetchGetPromos());
    }

  }, []);

  if (promo === undefined) {
    return;
  }

  if (promos === null) {
    return;
  }

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`} />
        <img src={promo.previewImg} srcSet={`${promo.previewImg2x} 2x`} width={1280} height={280} alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">
          Новинка!
        </span>
        <span className="title title--h1">
          {promo.name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link className="btn" to={`${AppRoute.CAMERA}/${promo.id}`}>
          Подробнее
        </Link>
      </p>
      <ButtonsPromo promo={promo} promos={promos} />
    </div>
  );
}
