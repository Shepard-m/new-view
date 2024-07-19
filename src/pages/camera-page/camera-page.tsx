import { useEffect, useState } from 'react';
import Container from '../../components/container/container';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { cameraSelectors } from '../../store/slice/camera/cameraSelectors';
import { fetchGetCamera, fetchGetPromos, fetchGetReviews, fetchGetSimilar } from '../../store/api-action';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { reviewsSelectors } from '../../store/slice/reviews/reviews-selectors';
import ProductInfo from '../../components/product-info/product-info';
import { AppRoute, OptionsStars } from '../../const';
import SimilarList from '../../components/similar-list/similar-list';
import { similarSelectors } from '../../store/slice/similar/similarSelectors';
import ListStars from '../../components/list-stars/list-stars';
import { Helmet } from 'react-helmet-async';

export default function CameraPage() {
  const dispatch = useAppDispatch();
  const { cameraId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const camera = useAppSelector(cameraSelectors);
  const reviews = useAppSelector(reviewsSelectors);
  const similar = useAppSelector(similarSelectors);
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      dispatch(fetchGetCamera(cameraId as string)),
      dispatch(fetchGetReviews(cameraId as string)),
      dispatch(fetchGetSimilar(cameraId as string)),
      dispatch(fetchGetPromos())
    ]).then(() => {
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [cameraId, navigate]);

  useEffect(() => {
    if (!isLoading && camera === null) {
      navigate(AppRoute.NOT_FOUND);
    }
  }, [isLoading, camera, navigate]);

  if (camera === null) {
    return <span></span>;
  }

  return (
    <Container scroll>
      <>
        <Helmet>
          <title>{camera.category} {camera.name}</title>
          <meta name={camera.name} content={camera.description} />
        </Helmet>
        <div className="page-content" data-testid={'camera-page'}>
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.CATALOG}>
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.CATALOG}>
                    Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{camera?.name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`} />
                    <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x} 2x`} width={280} height={240} alt={camera.name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.category} {camera.name}</h1>
                  <ListStars optionsStars={OptionsStars.REVIEWS} countComments={camera.reviewCount} countStar={camera.rating} />
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{camera?.price} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width={24} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-add-basket" />
                    </svg>
                    Добавить в корзину
                  </button>
                  <ProductInfo camera={camera} />
                </div>
              </div>
            </section>
          </div>
          {similar !== null &&
            <div className="page-content__section">
              <SimilarList similar={similar} />
            </div>}
          {reviews?.length !== 0 &&
            <div className="page-content__section">

              <section className="review-block">
                <div className="container">
                  <div className="page-content__headed">
                    <h2 className="title title--h3">Отзывы</h2>
                  </div>
                  <ReviewsList reviews={reviews} />
                </div>
              </section>
            </div>}
        </div>
      </>
    </Container>
  );
}
