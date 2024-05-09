import { useState } from 'react';
import { TProduct } from '../types/product';
import { OPTIONS_TABS } from '../utils/utils';

type TProductInfo = {
  camera: TProduct;
}

export default function ProductInfo({ camera }: TProductInfo) {
  const [infoProduct, setInfoProduct] = useState(OPTIONS_TABS.DESCRIPTION);
  function onSelectOptionClick() {
    setInfoProduct(OPTIONS_TABS.OPTIONS);
  }
  function onSelectDescriptionClick() {
    setInfoProduct(OPTIONS_TABS.DESCRIPTION);
  }
  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={`tabs__control ${infoProduct === OPTIONS_TABS.OPTIONS ? 'is-active' : ''}`} type="button" onClick={onSelectOptionClick}>Характеристики</button>
        <button className={`tabs__control ${infoProduct === OPTIONS_TABS.DESCRIPTION ? 'is-active' : ''}`} type="button" onClick={onSelectDescriptionClick}>Описание</button>
      </div>
      <div className="tabs__content">
        {infoProduct === OPTIONS_TABS.OPTIONS &&
          <div className={`tabs__element ${infoProduct === OPTIONS_TABS.OPTIONS ? 'is-active' : ''}`}>
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
        {infoProduct === OPTIONS_TABS.DESCRIPTION &&
          <div className={`tabs__element ${infoProduct === OPTIONS_TABS.DESCRIPTION ? 'is-active' : ''}`}>
            <div className="product__tabs-text">
              <p>{camera?.description}</p>
            </div>
          </div>}
      </div>
    </div>
  );
}
