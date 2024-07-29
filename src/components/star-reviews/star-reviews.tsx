import { Fragment, SyntheticEvent } from 'react';
import { OptionsStarReview, RequestStatus } from '../../const';
import { useAppSelector } from '../../types/indexStore';
import { statusBasketSelectors } from '../../store/slice/basket/basket-selectors';

type TStarReviews = {
  handelSelectStarClick: (star: number) => void;
}

export function StarReviews({ handelSelectStarClick }: TStarReviews) {
  const selector = useAppSelector;
  const statusBasket = selector(statusBasketSelectors);
  const listOptionStars = Object.values(OptionsStarReview);

  function onSelectStarClick(evt: SyntheticEvent<HTMLInputElement>) {
    handelSelectStarClick(+evt.currentTarget.defaultValue);
  }

  return (
    <div className="rate__group" data-testid={'star-reviews'}>
      {listOptionStars.map((star) =>
        (
          <Fragment key={star.text}>
            <input key={star.value} className="visually-hidden" id={`star-${star.value}`} name="rate" type="radio" defaultValue={star.value} onClick={onSelectStarClick} disabled={statusBasket === RequestStatus.LOADING}/>
            <label className="rate__label" htmlFor={`star-${star.value}`} title={star.text} />
          </Fragment>
        )
      )}
    </div>
  );
}
