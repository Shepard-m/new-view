import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { FilterCategory, FilterLevel, FilterType, OptionUrl, countCamerasForPage } from '../../const';
import { catalogActions } from '../../store/slice/catalog/catalog';
import { FilterLevelsKeys, FilterLevelsValues, FilterTypeKeys, FilterTypeValues } from '../../types/filter-index';
import { useAppDispatch, useAppSelector } from '../../types/indexStore';
import { camerasSelectors, filterCamerasSelectors, filterSettingsSelectors } from '../../store/slice/catalog/catalog-selectros';
import { updateURLParameterMulti, getURLParameterMulti, debounce, filterCatalog, getURLParameter, updateURLParameter, deleteURLParameter } from '../../utils/utils';
import { TProduct } from '../../types/product';
import { useNavigate } from 'react-router-dom';


export function FilterCatalog() {
  const filterSettings = useAppSelector(filterSettingsSelectors);
  const navigate = useNavigate();
  const filterCameras = useAppSelector(filterCamerasSelectors);
  const parametersUrl = Object.values(OptionUrl);
  const [levelFilter, setLevelFilter] = useState<string[]>(['']);
  const [typeFilter, setTypeFilter] = useState<string[]>(['']);
  const [isCameras, setIsCameras] = useState<boolean>(false);
  const cameras = useAppSelector(camerasSelectors);
  const [price, setPrice] = useState<{ from: string; to: string }>({ from: '', to: '' });
  const dispatch = useAppDispatch();
  const listTypes: { id: FilterTypeKeys; value: FilterTypeValues }[] = (Object.entries(FilterType)).map(([key, value]) => ({
    id: key as FilterTypeKeys,
    value
  }));
  const listLevels: { id: FilterLevelsKeys; value: FilterLevelsValues; index: number }[] = (Object.entries(FilterLevel)).map(([key, value], index) => ({
    id: key as FilterLevelsKeys,
    index: index++,
    value
  }));
  const listCategory = Object.values(FilterCategory);

  useEffect(() => {
    if (filterCameras === null) {
      return;
    }
    const totalPages = Math.ceil(filterCameras?.length / countCamerasForPage);
    if (totalPages === 1) {
      updateURLParameter(OptionUrl.PAGE, '1', navigate);
    }
  }, [filterCameras]);

  useEffect(() => {
    if (filterSettings.level) {
      setLevelFilter(filterSettings.level);
    }
  }, [filterSettings.level]);

  useEffect(() => {
    if (filterSettings.type) {
      setTypeFilter(filterSettings.type);
    }
  }, [filterSettings.type]);

  useEffect(() => {
    const category = getURLParameter(OptionUrl.CATEGORY_FILTER);
    const type = getURLParameterMulti(OptionUrl.TYPE_FILTER);
    const level = getURLParameterMulti(OptionUrl.LEVEL_FILTER);
    const priceMin = getURLParameter(OptionUrl.PRICE_MIN);
    const priceMax = getURLParameter(OptionUrl.PRICE_MAX);
    if (cameras === null && cameras !== null) {
      return;
    }
    if (priceMin !== null && priceMax !== null && cameras !== null) {
      setPrice({ from: priceMin, to: priceMax });
      setTimeout(() => {
        dispatch(catalogActions.filterPrice({ from: +priceMin, to: +priceMax }));
      }, 500);
    }
    if (category !== null && cameras !== null) {
      dispatch(catalogActions.filterCategory({ category: category }));
    }
    if (type !== null && cameras !== null) {
      for (const iterator of type) {
        dispatch(catalogActions.filterType({ type: iterator }));
      }
      setTypeFilter(type);

    }
    if (level.length > 0 && cameras !== null) {
      for (const iterator of level) {
        dispatch(catalogActions.filterLevel({ level: iterator }));
      }
      setLevelFilter(level);
    }
  }, [isCameras]);

  useEffect(() => {
    if (cameras !== null) {
      setIsCameras(true);
    } else {
      setIsCameras(false);
    }
  }, [cameras]);

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
    let copyFilterCameras: null | TProduct[] = null;


    copyFilterCameras = filterCatalog(cameras, filterSettings.category, { from: initialMinPrice, to: initialMaxPrice }, filterSettings.type, filterSettings.level, filterSettings.disabledType);
    initialFilterPrice = copyFilterCameras?.map((element) => element.price);
    initialMinPrice = Math.min(...initialFilterPrice);
    initialMaxPrice = Math.max(...initialFilterPrice);
    if (value.from === '') {
      minPrice = Math.min(...initialPrices);
    }
    if (value.to === '') {
      maxPrice = Math.max(...initialPrices);
    }

    if (minPrice < initialMinPrice || minPrice > initialMaxPrice || minPrice > maxPrice) {
      setPrice({ ...price, from: (initialMinPrice).toString() });
      minPrice = initialMinPrice;
    }

    if (maxPrice > initialMaxPrice || maxPrice < initialMinPrice || maxPrice < minPrice) {
      setPrice({ ...price, to: (initialMaxPrice).toString() });
      maxPrice = initialMaxPrice;
    }
    dispatch(catalogActions.filterPrice({ from: minPrice, to: maxPrice }));

    updateURLParameter(OptionUrl.PRICE_MIN, minPrice.toString(), navigate);
    updateURLParameter(OptionUrl.PRICE_MAX, maxPrice.toString(), navigate);

    setPrice({ from: minPrice.toString(), to: maxPrice.toString() });
  }, 1000), [filterSettings, cameras]);

  function onSelectTypeClick(evt: SyntheticEvent<HTMLSpanElement>) {
    if (evt.currentTarget.dataset.id) {
      dispatch(catalogActions.filterType({ type: evt.currentTarget.dataset.id }));
    }

    setTimeout(() => {
      if (filterSettings.type !== null) {
        updateURLParameterMulti(OptionUrl.TYPE_FILTER, filterSettings.type, navigate);
      }
    }, 500);
  }
  function onSelectLevelClick(evt: SyntheticEvent<HTMLSpanElement>) {
    if (evt.currentTarget.dataset.id) {
      dispatch(catalogActions.filterLevel({ level: evt.currentTarget.dataset.id }));
    }

    setTimeout(() => {
      if (filterSettings.level !== null) {
        updateURLParameterMulti(OptionUrl.LEVEL_FILTER, filterSettings.level, navigate);
      }
    }, 500);
  }
  function onSelectCategoryClick(evt: SyntheticEvent<HTMLSpanElement>) {
    if (evt.currentTarget.dataset.id) {
      updateURLParameter(OptionUrl.CATEGORY_FILTER, evt.currentTarget.dataset.id, navigate);
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
    setLevelFilter(['']);
    setTypeFilter(['']);
    for (const iterator of parametersUrl) {
      deleteURLParameter(iterator, navigate);
    }
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
                <input type="radio" name="category" checked={category.data === filterSettings.category} onChange={onSelectCategoryClick}/>
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
                <input type="checkbox" name={type.id.toLowerCase()} checked={typeFilter.includes(type.value)} disabled={Array.isArray(filterSettings.disabledType) && filterSettings.disabledType.includes(String(type.value))} onChange={onSelectTypeClick}/>
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
                <input type="checkbox" name={level.id.toLocaleLowerCase()} checked={levelFilter.includes(level.value)} onChange={onSelectLevelClick}/>
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
