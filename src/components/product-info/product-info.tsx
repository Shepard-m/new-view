import { SyntheticEvent, useEffect, useState } from 'react';
import { TProduct } from '../../types/product';
import { getURLParameter, OPTIONS_TABS, updateURLParameter } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { OptionUrl } from '../../const';

type TProductInfo = {
  camera: TProduct;
}

export default function ProductInfo({ camera }: TProductInfo) {
  const [infoProduct, setInfoProduct] = useState(OPTIONS_TABS.DESCRIPTION.type);
  const navigate = useNavigate();
  useEffect(() => {
    const urlParameterTab = getURLParameter(OptionUrl.TABS_CAMERA);
    if (urlParameterTab) {
      setInfoProduct(urlParameterTab);
    }
  }, []);
  const options = Object.values(OPTIONS_TABS);
  function onSelectTabsClick(evt: SyntheticEvent<HTMLButtonElement>) {
    if (evt.currentTarget.dataset.tabs) {
      const tabInfo = evt.currentTarget.dataset.tabs;
      setInfoProduct(tabInfo);
      updateURLParameter(OptionUrl.TABS_CAMERA, tabInfo, navigate);
    }
  }
  return (
    <div className="tabs product__tabs" data-testid={'product-info'}>
      <div className="tabs__controls product__tabs-controls">
        {options.map((element) =>
          <button key={element.type} className={`tabs__control ${infoProduct === element.type ? 'is-active' : ''}`} data-tabs={element.type} type="button" onClick={onSelectTabsClick}>{element.text}</button>
        )}
      </div>
      <div className="tabs__content">
        {infoProduct === OPTIONS_TABS.OPTIONS.type &&
          <div className={`tabs__element ${infoProduct === OPTIONS_TABS.OPTIONS.type ? 'is-active' : ''}`}>
            <ul className="product__tabs-list">
              <li className="item-list"><span className="item-list__title">Артикул:</span>
                <p className="item-list__text">{camera?.vendorCode}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Категория:</span>
                <p className="item-list__text">{camera?.category}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                <p className="item-list__text">{camera?.type}</p>
              </li>
              <li className="item-list"><span className="item-list__title">Уровень:</span>
                <p className="item-list__text">{camera?.level}</p>
              </li>
            </ul>
          </div>}
        {infoProduct === OPTIONS_TABS.DESCRIPTION.type &&
          <div className={`tabs__element ${infoProduct === OPTIONS_TABS.DESCRIPTION.type ? 'is-active' : ''}`}>
            <div className="product__tabs-text">
              <p>{camera?.description}</p>
            </div>
          </div>}
      </div>
    </div>
  );
}
