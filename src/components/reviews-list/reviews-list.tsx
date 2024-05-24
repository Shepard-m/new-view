import { useEffect, useRef, useState } from 'react';
import { TReview } from '../../types/review';
import Review from '../review/review';
import { sortReviewsByDate } from '../../utils/utils';
import { STEP_ADD_REVIEWS } from '../../const';

type TReviews = {
  reviews: TReview[] | null;
}

export default function ReviewsList({ reviews }: TReviews) {
  const reviewContainer = useRef<HTMLUListElement>(null);
  const [sizeReviews, setSizeReviews] = useState(STEP_ADD_REVIEWS);

  useEffect(() => {
    setSizeReviews(STEP_ADD_REVIEWS);
  }, [reviews]);

  const onAddReviewsClick = () => {
    setSizeReviews(sizeReviews + STEP_ADD_REVIEWS);
  };

  const onAddReviewsScrollWheel = (evt: React.WheelEvent<HTMLUListElement>) => {

    if (evt.deltaY > 0) {
      setSizeReviews(sizeReviews + STEP_ADD_REVIEWS);
    }

  };

  if (reviews === null) {
    return;
  }

  const sortReviews = sortReviewsByDate(reviews);

  const dataReviews = sortReviews.slice(0, sizeReviews);
  return (
    <>
      <ul className="review-block__list" ref={reviewContainer} onWheel={onAddReviewsScrollWheel} data-testid={'reviews-list'}>
        {dataReviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
      <div className="review-block__buttons">
        {reviews.length > 3 && sizeReviews !== reviews.length && sizeReviews < reviews.length
          ?
          <button className="btn btn--purple" type="button" onClick={onAddReviewsClick}>
            Показать больше отзывов
          </button>
          : ''}
      </div>
    </>
  );
}
