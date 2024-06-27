import { SyntheticEvent } from 'react';
import { DirectionSorting, SettingSort } from '../../const';
import { catalogActions } from '../../store/slice/catalog/catalog';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { directionSortingSelectors, typeSortingSelectors } from '../../store/slice/catalog/catalog-selectros';

export default function CatalogSort() {
  const typesSettings = Object.values(SettingSort);
  const directionSettings = Object.values(DirectionSorting);
  const typeSort = useAppSelector(typeSortingSelectors);
  const directionSort = useAppSelector(directionSortingSelectors);
  const dispatch = useAppDispatch();
  function onSortingCamerasByTypeClick(evt: SyntheticEvent<HTMLLabelElement>) {
    if (evt.currentTarget.dataset.type !== undefined) {
      dispatch(catalogActions.sortingByType({ type: evt.currentTarget.dataset.type }));
    }
  }
  function onSortingCamerasByDirectionClick(evt: SyntheticEvent<HTMLLabelElement>) {
    if (evt.currentTarget.dataset.direction !== undefined) {
      dispatch(catalogActions.sortingByDirection({ direction: evt.currentTarget.dataset.direction }));
    }
  }

  return (
    <div className="catalog-sort" data-testid={'CatalogSort'}>
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {typesSettings.map((typeElement) => (
              <div key={typeElement.value} className="catalog-sort__btn-text">
                <input type="radio" id={`sort${typeElement.type}`} name="sort" defaultChecked={typeElement.type === typeSort} />
                <label htmlFor={`sort${typeElement.type}`} data-type={typeElement.type} onClick={onSortingCamerasByTypeClick}>{typeElement.value}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {directionSettings.map((direction) => (
              <div key={direction.id} className={`catalog-sort__btn catalog-sort__btn--${direction.id}`}>
                <input type="radio" id={direction.id} name="sort-icon" defaultChecked={direction.direction === directionSort} aria-label={direction.value} />
                <label htmlFor={direction.id} data-direction={direction.direction} onClick={onSortingCamerasByDirectionClick}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
