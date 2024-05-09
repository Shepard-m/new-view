import { useState } from 'react';
import { TReview } from '../types/review';
import Review from './review';
import { sortReviewsByDate } from '../utils/utils';
import { STEP_ADD_REVIEWS } from '../const';

type TReviews = {
  reviews: TReview[] | null;
}

export default function ReviewsList({ reviews }: TReviews) {
  const [sizeReviews, setSizeReviews] = useState(STEP_ADD_REVIEWS);
  if (reviews === null) {
    return;
  }

  const sortReviews = sortReviewsByDate(reviews);

  function onAddReviews() {
    setSizeReviews(sizeReviews + STEP_ADD_REVIEWS);
  }

  const dataReviews = sortReviews.slice(0, sizeReviews);
  return (
    <>
      <ul className="review-block__list">
        {dataReviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
      <div className="review-block__buttons">
        {reviews.length > 3 && sizeReviews !== reviews.length && sizeReviews < reviews.length
          ?
          <button className="btn btn--purple" type="button" onClick={onAddReviews}>
            Показать больше отзывов
          </button>
          : ''}

      </div>
    </>
  );
}
