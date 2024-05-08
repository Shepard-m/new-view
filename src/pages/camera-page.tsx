import { useEffect } from 'react';
import Container from '../components/container';
import ReviewsList from '../components/reviews-list';
import { useAppDispatch, useAppSelector } from '../hooks/indexStore';
import { cameraSelectors } from '../store/slice/camera/cameraSelectors';
import { fetchGetCamera, fetchGetReviews } from '../store/api-action';
import { useParams } from 'react-router-dom';
import { reviewsSelectors } from '../store/slice/reviews/revies-selectors';
import { Helmet } from 'react-helmet-async';

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
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">
                    Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
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
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">Характеристики</button>
                      <button className="tabs__control is-active" type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text">{camera?.vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{camera?.category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{camera?.type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{camera?.level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">
                          <p>{camera?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/*<div class="page-content__section">
      <section class="product-similar">
        <div class="container">
          <h2 class="title title&#45;&#45;h3">Похожие товары</h2>
          <div class="product-similar__slider">
            <div class="product-similar__slider-list">
              <div class="product-card is-active">
                <div class="product-card__img">
                  <picture>
                    <source type="image/webp" srcset="img/content/img9.webp, img/content/img9@2x.webp 2x"><img src="img/content/img9.jpg" srcset="img/content/img9@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5">
                  </picture>
                </div>
                <div class="product-card__info">
                  <div class="rate product-card__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-star"></use>
                    </svg>
                    <p class="visually-hidden">Рейтинг: 4</p>
                    <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>12</p>
                  </div>
                  <p class="product-card__title">Фотоаппарат FastShot MR-5</p>
                  <p class="product-card__price"><span class="visually-hidden">Цена:</span>18 970 ₽
                  </p>
                </div>
                <div class="product-card__buttons">
                  <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                  </button>
                  <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                  </a>
                </div>
              </div>
              <div class="product-card is-active">
                <div class="product-card__img">
                  <picture>
                    <source type="image/webp" srcset="img/content/img1.webp, img/content/img1@2x.webp 2x"><img src="img/content/img1.jpg" srcset="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»">
                  </picture>
                </div>
                <div class="product-card__info">
                  <div class="rate product-card__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-star"></use>
                    </svg>
                    <p class="visually-hidden">Рейтинг: 3</p>
                    <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>23</p>
                  </div>
                  <p class="product-card__title">Ретрокамера «Das Auge IV»</p>
                  <p class="product-card__price"><span class="visually-hidden">Цена:</span>73 450 ₽
                  </p>
                </div>
                <div class="product-card__buttons">
                  <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                  </button>
                  <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                  </a>
                </div>
              </div>
              <div class="product-card is-active">
                <div class="product-card__img">
                  <picture>
                    <source type="image/webp" srcset="img/content/img5.webp, img/content/img5@2x.webp 2x"><img src="img/content/img5.jpg" srcset="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2">
                  </picture>
                </div>
                <div class="product-card__info">
                  <div class="rate product-card__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlink:href="#icon-full-star"></use>
                    </svg>
                    <p class="visually-hidden">Рейтинг: 5</p>
                    <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>849</p>
                  </div>
                  <p class="product-card__title">Фотоаппарат Instaprinter P2</p>
                  <p class="product-card__price"><span class="visually-hidden">Цена:</span>8 430 ₽
                  </p>
                </div>
                <div class="product-card__buttons">
                  <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                  </button>
                  <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                  </a>
                </div>
              </div>
            </div>
            <button class="slider-controls slider-controls&#45;&#45;prev" type="button" aria-label="Предыдущий слайд" disabled>
              <svg width="7" height="12" aria-hidden="true">
                <use xlink:href="#icon-arrow"></use>
              </svg>
            </button>
            <button class="slider-controls slider-controls&#45;&#45;next" type="button" aria-label="Следующий слайд">
              <svg width="7" height="12" aria-hidden="true">
                <use xlink:href="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>*/}
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  {/*<button class="btn" type="button">Оставить свой отзыв</button>*/}
                </div>
                <ReviewsList reviews={reviews} />
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    </Container>
  );
}
