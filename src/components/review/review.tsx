import { OptionsStars } from '../../const';
import { TReview } from '../../types/review';
import { converterData } from '../../utils/utils';
import ListStars from '../list-stars/list-stars';

type TReviewUser = {
  review: TReview;
}

export default function Review({ review }: TReviewUser) {
  const data = converterData(review.createAt);
  return (
    <li className="review-card" data-testId={'review'}>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{data}</time>
      </div>
      <ListStars countStar={review.rating} optionsStars={OptionsStars.REVIEWS} countComments={0} />
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
