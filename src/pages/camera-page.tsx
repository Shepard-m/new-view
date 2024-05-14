import { useEffect } from 'react';
import Container from '../components/container';
import ReviewsList from '../components/reviews-list';
import { useAppDispatch, useAppSelector } from '../hooks/indexStore';
import { cameraSelectors } from '../store/slice/camera/cameraSelectors';
import { fetchGetCamera, fetchGetReviews, fetchGetSimilar } from '../store/api-action';
import { Link, useParams } from 'react-router-dom';
import { reviewsSelectors } from '../store/slice/reviews/revies-selectors';
import { Helmet } from 'react-helmet-async';
import ProductInfo from '../components/product-info';
import { AppRoute, OptionsStars } from '../const';
import SimilarList from '../components/similar-list';
import { similarSelectors } from '../store/slice/similar/similarSelectors';
import ListStars from '../components/list-stars';

export default function CameraPage() {
  const dispatch = useAppDispatch();
  const { cameraId } = useParams();

  useEffect(() => {
    dispatch(fetchGetCamera(cameraId as string));
    dispatch(fetchGetReviews(cameraId as string));
    dispatch(fetchGetSimilar(cameraId as string));
    window.scrollTo(0, 0);
  }, [cameraId]);

  const camera = useAppSelector(cameraSelectors);
  const reviews = useAppSelector(reviewsSelectors);
  const similar = useAppSelector(similarSelectors);

  if (camera === null) {
    return;
  }

  return (
    <Container scroll>
      <>
        <Helmet>
          {camera.name}
        </Helmet>
        <div className="page-content">
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
                    <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
                    <img src={`${camera.previewImg}`} srcSet={`${camera.previewImg2x} 2x`} width={280} height={240} alt={camera.name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera?.name}</h1>
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
          <div className="page-content__section">
            {similar !== null && <SimilarList similar={similar} />}
          </div>

          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  {/*<button class="btn" type="button">Оставить свой отзыв</button>*/}
                </div>
                <ReviewsList reviews={reviews} />
              </div>
            </section>
          </div>
        </div>
      </>
    </Container>
  );
}
