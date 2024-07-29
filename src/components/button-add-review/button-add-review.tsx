import { SyntheticEvent, useRef, useState } from 'react';
import { StarReviews } from '../star-reviews/star-reviews';
import { TAddReview } from '../../types/add-review';
import { useForm } from 'react-hook-form';
import { AppRoute, OptionsValidationReview, TextError, TextErrorValidationReview } from '../../const';
import { TValidationFormReview } from '../../types/validationFormReview';
import { useAppDispatch } from '../../types/indexStore';
import { fetchGetReviews, fetchPostReview } from '../../store/api-action';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type TButtonAddReview = {
  cameraId: number;
}

export function ButtonAddReview({ cameraId }: TButtonAddReview) {
  const dispatch = useAppDispatch();
  const formReview = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TValidationFormReview>();
  const [isModal, setIsModal] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [review, setReview] = useState<TAddReview>({
    cameraId: cameraId,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: 0,
  });

  function handelSelectStarClick(star: number) {
    setReview({...review, rating: star});
    setIsRating(false);
  }

  function onOpenReviewClick() {
    setIsModal(true);
  }

  function onCloseReviewClick() {
    setIsModal(false);
    setReview(
      {
        cameraId: cameraId,
        userName: '',
        advantage: '',
        disadvantage: '',
        review: '',
        rating: 0,
      }
    );
    reset();
  }

  function onCloseModalSuccessClick() {
    setIsModalSuccess(false);
  }

  function onInputNameChange(e: SyntheticEvent<HTMLInputElement>) {
    setReview({...review, userName: e.currentTarget.value});
  }

  function onInputPlusChange(e: SyntheticEvent<HTMLInputElement>) {
    setReview({...review, advantage: e.currentTarget.value});
  }

  function onInputMinusChange(e: SyntheticEvent<HTMLInputElement>) {
    setReview({...review, disadvantage: e.currentTarget.value});
  }

  function onInputCommentChange(e: SyntheticEvent<HTMLTextAreaElement>) {
    setReview({...review, review: e.currentTarget.value});
  }

  function onSendReviewSubmit() {
    dispatch(fetchPostReview(review))
      .unwrap()
      .then(() => {
        formReview.current?.reset();
        reset();
        dispatch(fetchGetReviews(cameraId.toString()));
        setIsModal(false);
        setReview(
          {
            cameraId: cameraId,
            userName: '',
            advantage: '',
            disadvantage: '',
            review: '',
            rating: 0,
          }
        );
        setIsModalSuccess(true);
      })
      .catch(() => {
        toast.error(TextError.REVIEW);
      });

  }

  return (
    <>
      <button className="btn" type="button" onClick={onOpenReviewClick} data-testid={'button-add-review'}>
        Оставить свой отзыв
      </button>
      {isModal
      &&
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form ref={formReview} method="post" onSubmit={(event) => {
                if (review.rating === 0) {
                  setIsRating(true);
                }
                void handleSubmit(onSendReviewSubmit)(event);
              }}
              >
                <div className="form-review__rate">
                  <fieldset className={`rate form-review__item ${isRating ? 'is-invalid' : ''}`}>
                    <legend className="rate__caption">Рейтинг
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <StarReviews handelSelectStarClick={handelSelectStarClick}/>
                      <div className="rate__progress">
                        <span className="rate__stars">
                          {review.rating}
                        </span>
                        <span>
                          /
                        </span>
                        <span className="rate__all-stars">
                          5
                        </span>
                      </div>
                    </div>
                    {isRating
                    &&
                    <p className="rate__message">{TextErrorValidationReview.RATING.required}</p>}
                  </fieldset>
                  <div className={`custom-input form-review__item ${errors['user-name'] ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input type="text" placeholder="Введите ваше имя" value={review.userName} {...register('user-name', {
                        required: TextErrorValidationReview.NAME.required,
                        minLength: {
                          message: TextErrorValidationReview.NAME.minLength,
                          value: OptionsValidationReview.NAME.minLength
                        },
                        maxLength: {
                          message: TextErrorValidationReview.NAME.maxLength,
                          value: OptionsValidationReview.NAME.maxLength
                        },
                        onChange: onInputNameChange,
                      })} required
                      />
                    </label>
                    {errors['user-name'] &&
                      <p className='custom-input__error is-invalid'>{errors['user-name'].message}</p>}
                  </div>
                  <div className={`custom-input form-review__item ${errors['user-plus'] ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input type="text" placeholder="Основные преимущества товара" value={review.advantage} {...register('user-plus', {
                        required: TextErrorValidationReview.PLUS.required,
                        minLength: {
                          message: TextErrorValidationReview.PLUS.minLength,
                          value: OptionsValidationReview.ADVANTAGES.minLength
                        },
                        maxLength: {
                          message: TextErrorValidationReview.PLUS.maxLength,
                          value: OptionsValidationReview.ADVANTAGES.maxLength
                        },
                        onChange: onInputPlusChange
                      })}
                      />
                    </label>
                    {errors['user-plus'] &&
                      <p className='custom-input__error is-invalid'>{errors['user-plus'].message}</p>}
                  </div>
                  <div className={`custom-input form-review__item ${errors['user-minus'] ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <input type="text" placeholder="Главные недостатки товара" value={review.disadvantage} {...register('user-minus', {
                        required: TextErrorValidationReview.MINUS.required,
                        minLength: {
                          message: TextErrorValidationReview.MINUS.minLength,
                          value: OptionsValidationReview.ADVANTAGES.minLength
                        },
                        maxLength: {
                          message: TextErrorValidationReview.MINUS.maxLength,
                          value: OptionsValidationReview.ADVANTAGES.maxLength
                        },
                        onChange: onInputMinusChange
                      })}
                      />
                    </label>
                    {errors['user-minus'] &&
                      <p className='custom-input__error is-invalid'>{errors['user-minus'].message}</p>}
                  </div>
                  <div className={`custom-textarea form-review__item ${errors['user-comment'] ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width={9} height={9} aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <textarea placeholder="Поделитесь своим опытом покупки" value={review.review} {...register('user-comment', {
                        required: TextErrorValidationReview.COMMENT.required,
                        minLength: {
                          message: TextErrorValidationReview.COMMENT.minLength,
                          value: OptionsValidationReview.COMMENT.minLength
                        },
                        maxLength: {
                          message: TextErrorValidationReview.COMMENT.maxLength,
                          value: OptionsValidationReview.COMMENT.maxLength
                        },
                        onChange: onInputCommentChange
                      })}
                      />
                    </label>
                    {errors['user-comment'] &&
                      <p className='custom-input__error is-invalid'>{errors['user-comment'].message}</p>}
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseReviewClick}>
              <svg width={10} height={10} aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>}
      {isModalSuccess &&
        <div className="modal is-active modal--narrow">
          <div className="modal__wrapper">
            <div className="modal__overlay" />
            <div className="modal__content">
              <p className="title title--h4">Спасибо за отзыв</p>
              <svg className="modal__icon" width={80} height={78} aria-hidden="true">
                <use xlinkHref="#icon-review-success" />
              </svg>
              <div className="modal__buttons">
                <Link className="btn btn--purple modal__btn modal__btn--fit-width" type="button" to={AppRoute.CATALOG}>
                  Вернуться к покупкам
                </Link>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onCloseModalSuccessClick}>
                <svg width={10} height={10} aria-hidden="true">
                  <use xlinkHref="#icon-close" />
                </svg>
              </button>
            </div>
          </div>
        </div>}
    </>
  );
}

