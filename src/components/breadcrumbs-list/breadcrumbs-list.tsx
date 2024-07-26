import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type TBreadcrumbsList = {
  name?: string;
}

export default function BreadcrumbsList({ name }: TBreadcrumbsList) {
  return (
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
      {name !== undefined
      &&
      <li className="breadcrumbs__item">
        <span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
      </li>}
    </ul>
  );
}
