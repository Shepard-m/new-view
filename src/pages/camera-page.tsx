import { useEffect, useState } from 'react';
import Container from '../components/container';
import ReviewsList from '../components/reviews-list';
import { useAppDispatch, useAppSelector } from '../hooks/indexStore';
import { cameraSelectors } from '../store/slice/camera/cameraSelectors';
import { fetchGetCamera, fetchGetReviews } from '../store/api-action';
import { Link, useParams } from 'react-router-dom';
import { reviewsSelectors } from '../store/slice/reviews/revies-selectors';
import { Helmet } from 'react-helmet-async';
import ProductInfo from '../components/product-info';
import { AppRoute } from '../const';

export default function CameraPage() {
  const dispatch = useAppDispatch();
  const { cameraId } = useParams();

  useEffect(() => {
    dispatch(fetchGetCamera(cameraId as string));
    dispatch(fetchGetReviews(cameraId as string));
  }, []);

  const camera = useAppSelector(cameraSelectors);
  const reviews = useAppSelector(reviewsSelectors);

  if (camera === null) {
    return;
  }

  return (
    <Container>
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
                  <div className="rate product__rate">
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-full-star" />
                    </svg>
                    <svg width={17} height={16} aria-hidden="true">
                      <use xlinkHref="#icon-star" />
                    </svg>
                    <p className="visually-hidden">Рейтинг: {camera?.rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera?.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{camera?.price}</p>
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
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                  <div className="product-similar__slider-list">
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x" /><img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width={280} height={240} alt="Фотоаппарат FastShot MR-5" />
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-star" />
                          </svg>
                          <p className="visually-hidden">Рейтинг: 4</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                        </div>
                        <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x" /><img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width={280} height={240} alt="Ретрокамера «Das Auge IV»" />
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-star" />
                          </svg>
                          <p className="visually-hidden">Рейтинг: 3</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                        </div>
                        <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x" /><img src="img/content/img5.jpg" srcSet="img/content/img5@2x.jpg 2x" width={280} height={240} alt="Фотоаппарат Instaprinter P2" />
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <svg width={17} height={16} aria-hidden="true">
                            <use xlinkHref="#icon-full-star" />
                          </svg>
                          <p className="visually-hidden">Рейтинг: 5</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                        </div>
                        <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                  <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
                    <svg width={7} height={12} aria-hidden="true">
                      <use xlinkHref="#icon-arrow" />
                    </svg>
                  </button>
                  <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
                    <svg width={7} height={12} aria-hidden="true">
                      <use xlinkHref="#icon-arrow" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
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
