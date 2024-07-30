import { Fragment, SyntheticEvent } from 'react';
import { OptionsStarReview, RequestStatus } from '../../const';
import { useAppSelector } from '../../types/indexStore';
import { reviewsStatusSelectors } from '../../store/slice/reviews/reviews-selectors';

type TStarReviews = {
  handelSelectStarClick: (star: number) => void;
}

export function StarReviews({ handelSelectStarClick }: TStarReviews) {
  const selector = useAppSelector;
  const reviewsStatus = selector(reviewsStatusSelectors);
  const listOptionStars = Object.values(OptionsStarReview);

  function onSelectStarClick(evt: SyntheticEvent<HTMLInputElement>) {
    handelSelectStarClick(+evt.currentTarget.defaultValue);
  }

  return (
    <div className="rate__group" data-testid={'star-reviews'}>
      {listOptionStars.map((star) =>
        (
          <Fragment key={star.text}>
            <input key={star.value} className="visually-hidden" id={`star-${star.value}`} name={`rate-${star.value}`} type="radio" defaultValue={star.value} onClick={onSelectStarClick} disabled={reviewsStatus === RequestStatus.LOADING}/>
            <label className="rate__label" htmlFor={`star-${star.value}`} title={star.text} />
          </Fragment>
        )
      )}
    </div>
  );
}
