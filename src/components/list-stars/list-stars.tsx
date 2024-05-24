import { COUNT_STAR, OptionsStars } from '../../const';

type TStars = {
  countStar: number;
  optionsStars: typeof OptionsStars.PRODUCT;
  countComments: number;
}
export default function ListStars({ countStar, optionsStars, countComments }: TStars) {
  const listStars = [];
  const defaultListStars = [];

  for (let i = 0; i < countStar; i++) {
    listStars.push(
      <svg key={i} width={17} height={16} aria-hidden="true">
        <use xlinkHref="#icon-full-star" />
      </svg>
    );
  }

  if (listStars.length < COUNT_STAR) {

    for (let i = 0; i < COUNT_STAR - listStars.length; i++) {
      defaultListStars.push(
        <svg key={`d${i}`} width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-star" />
        </svg>
      );
    }
  }
  return (
    <div className={`rate ${optionsStars.class}-card__rate`} data-testId={'list-stars'}>
      {listStars}{defaultListStars}
      <p className="visually-hidden">Оценка: {countStar}</p>
      {optionsStars.isText
        && <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{countComments}</p>}
    </div>
  );
}
