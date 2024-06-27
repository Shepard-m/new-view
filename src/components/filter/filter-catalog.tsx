import { ChangeEvent, SyntheticEvent, useCallback, useState } from 'react';
import { FilterCategory, FilterLevel, FilterType } from '../../const';
import { catalogActions } from '../../store/slice/catalog/catalog';
import { FilterLevelsKeys, FilterLevelsValues, FilterTypeKeys, FilterTypeValues } from '../../types/filter-index';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { camerasSelectors, filterSettingsSelectors } from '../../store/slice/catalog/catalog-selectros';
import { debounce, filterCatalog } from '../../utils/utils';
import { TProduct } from '../../types/product';


export function FilterCatalog() {
  const filterSettings = useAppSelector(filterSettingsSelectors);
  const cameras = useAppSelector(camerasSelectors);
  const [price, setPrice] = useState<{ from: string; to: string }>({ from: '', to: '' });
  const dispatch = useAppDispatch();
  const listTypes: { id: FilterTypeKeys; value: FilterTypeValues }[] = (Object.entries(FilterType)).map(([key, value]) => ({
    id: key as FilterTypeKeys,
    value
  }));
  const listLevels: { id: FilterLevelsKeys; value: FilterLevelsValues }[] = (Object.entries(FilterLevel)).map(([key, value]) => ({
    id: key as FilterLevelsKeys,
    value
  }));
  const listCategory = Object.values(FilterCategory);

  const debouncedLog = useCallback(debounce((value: { from: string; to: string }) => {
    if (cameras === null) {
      return;
    }
    const initialPrices = cameras.map((element) => element.price);
    let minPrice = +value.from;
    let maxPrice = +value.to;
    let initialMinPrice = Math.min(...initialPrices);
    let initialMaxPrice = Math.max(...initialPrices);
    let initialFilterPrice: undefined | number[] = [];
    let filterCameras: null | TProduct[] = null;

    if (value.from === '') {
      minPrice = Math.min(...initialPrices);
    }
    if (value.to === '') {
      maxPrice = Math.max(...initialPrices);
    }

    filterCameras = filterCatalog(cameras, filterSettings.category, { from: initialMinPrice, to: initialMaxPrice }, filterSettings.type, filterSettings.level, filterSettings.disabledType);
    initialFilterPrice = filterCameras?.map((element) => element.price);

    initialMinPrice = Math.min(...initialFilterPrice as number[]);
    initialMaxPrice = Math.max(...initialFilterPrice as number[]);

    if (minPrice < initialMinPrice || minPrice > initialMaxPrice) {
      setPrice({ ...price, from: (initialMinPrice).toString() });
      minPrice = initialMinPrice;
    }

    if (maxPrice > initialMaxPrice || maxPrice < initialMinPrice) {
      setPrice({ ...price, to: (initialMaxPrice).toString() });
      maxPrice = initialMaxPrice;
    }

    dispatch(catalogActions.filterPrice({ from: minPrice, to: maxPrice }));

    setPrice({ from: minPrice.toString(), to: maxPrice.toString() });
  }, 1000), [filterSettings, cameras]);

  function onSelectTypeClick(evt: SyntheticEvent<HTMLSpanElement>) {
    if (evt.currentTarget.dataset.id) {
      dispatch(catalogActions.filterType({ type: evt.currentTarget.dataset.id }));
    }
  }
  function onSelectLevelClick(evt: SyntheticEvent<HTMLSpanElement>) {
    if (evt.currentTarget.dataset.id) {
      dispatch(catalogActions.filterLevel({ level: evt.currentTarget.dataset.id }));
    }
  }
  function onSelectCategoryClick(evt: SyntheticEvent<HTMLSpanElement>) {
    if (evt.currentTarget.dataset.id) {
      dispatch(catalogActions.filterCategory({ category: evt.currentTarget.dataset.id }));
    }
  }

  function onChangeMinPriceKeyDown(evt: ChangeEvent<HTMLInputElement>) {
    setPrice((prev) => {
      const updatedPrice = { ...prev, from: evt.target.value };
      debouncedLog(updatedPrice);
      return updatedPrice;
    });
  }
  function onChangeMaxPriceKeyDown(evt: ChangeEvent<HTMLInputElement>) {
    setPrice((prev) => {
      const updatedPrice = { ...prev, to: evt.target.value };
      debouncedLog(updatedPrice);
      return updatedPrice;
    });
  }

  function onClearFormFilterSubmit() {
    setPrice({ from: '', to: '' });
    dispatch(catalogActions.clearFilter());
  }

  return (
    <div className="catalog-filter" data-testid={'filter'}>
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" value={price.from} name="price" placeholder={`от ${filterSettings.placeholderPrice.from}`} onChange={onChangeMinPriceKeyDown} />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" value={price.to} name="priceUp" placeholder={`до ${filterSettings.placeholderPrice.to}`} onChange={onChangeMaxPriceKeyDown} />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          {listCategory.map((category) => (
            <div key={category.value} className="custom-radio catalog-filter__item">
              <label>
                <input type="radio" name="category" />
                <span data-id={category.data} className="custom-radio__icon" onClick={onSelectCategoryClick} />
                <span data-id={category.data} className="custom-radio__label" onClick={onSelectCategoryClick}>{category.value}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {listTypes.map((type) => (
            <div key={type.id} className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name={type.id.toLowerCase()} disabled={Array.isArray(filterSettings.disabledType) && filterSettings.disabledType.includes(String(type.value))} />
                <span data-id={type.value} onClick={onSelectTypeClick} className="custom-checkbox__icon" />
                <span data-id={type.value} onClick={onSelectTypeClick} className="custom-checkbox__label">{type.value}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {listLevels.map((level) => (
            <div key={level.id} className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name={level.id.toLocaleLowerCase()} />
                <span data-id={level.value} onClick={onSelectLevelClick} className="custom-checkbox__icon" />
                <span data-id={level.value} onClick={onSelectLevelClick} className="custom-checkbox__label">{level.value}</span>
              </label>
            </div>
          ))}
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={onClearFormFilterSubmit}>Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
