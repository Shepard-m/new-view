import { SyntheticEvent, useEffect } from 'react';
import { DirectionSorting, OptionUrl, SettingSort } from '../../const';
import { catalogActions } from '../../store/slice/catalog/catalog';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { camerasSelectors, directionSortingSelectors, typeSortingSelectors } from '../../store/slice/catalog/catalog-selectros';
import { getURLParameter, updateURLParameter } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export default function CatalogSort() {
  const typesSettings = Object.values(SettingSort);
  const navigate = useNavigate();
  const cameras = useAppSelector(camerasSelectors);
  const directionSettings = Object.values(DirectionSorting);
  const typeSort = useAppSelector(typeSortingSelectors);
  const directionSort = useAppSelector(directionSortingSelectors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const type = getURLParameter(OptionUrl.TYPE_SORT);
    const direction = getURLParameter(OptionUrl.DIRECTION_SORT);
    if (cameras === null) {
      return;
    }
    if (type !== null) {
      setTimeout(() => {
        dispatch(catalogActions.sortingByType({ type }));
      }, 1000);
    }

    if (direction !== null) {
      setTimeout(() => {
        dispatch(catalogActions.sortingByDirection({ direction }));
      }, 1000);
    }
  }, [cameras]);

  function onSortingCamerasByTypeClick(evt: SyntheticEvent<HTMLLabelElement | HTMLInputElement>) {
    if (evt.currentTarget.dataset.type !== undefined) {
      dispatch(catalogActions.sortingByType({ type: evt.currentTarget.dataset.type }));
      updateURLParameter(OptionUrl.TYPE_SORT, evt.currentTarget.dataset.type, navigate);
    }
  }
  function onSortingCamerasByDirectionClick(evt: SyntheticEvent<HTMLLabelElement | HTMLInputElement>) {
    if (evt.currentTarget.dataset.direction !== undefined) {
      dispatch(catalogActions.sortingByDirection({ direction: evt.currentTarget.dataset.direction }));
      updateURLParameter(OptionUrl.DIRECTION_SORT, evt.currentTarget.dataset.direction, navigate);
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
                <input type="radio" id={`sort${typeElement.type}`} data-type={typeElement.type} name="sort" checked={typeElement.type === typeSort} onChange={onSortingCamerasByTypeClick}/>
                <label htmlFor={`sort${typeElement.type}`} data-type={typeElement.type} onClick={onSortingCamerasByTypeClick}>{typeElement.value}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {directionSettings.map((direction) => (
              <div key={direction.id} className={`catalog-sort__btn catalog-sort__btn--${direction.id}`}>
                <input type="radio" id={direction.id} data-direction={direction.direction} name="sort-icon" checked={direction.direction === directionSort} onChange={onSortingCamerasByDirectionClick} aria-label={direction.value} />
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
