import { TReview } from '../types/review';
import Review from './review';

type TReviews = {
  reviews: TReview[] | null;
}

export default function ReviewsList({ reviews }: TReviews) {
  if (reviews === null) {
    return;
  }
  return (
    <ul className="review-block__list">
      {reviews.map((review) => <Review key={review.id} review={review} />)}
    </ul>
  );
}
