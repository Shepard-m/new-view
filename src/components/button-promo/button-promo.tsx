import { SyntheticEvent } from 'react';
import './button-promo-style.css';


type TButtonPromo = {
  idPromo: number;
  selectedPromoId: number;
  handleSelectPromoClick: (id: string, index: string) => void;
  indexButton: number;
}

export default function ButtonPromo({ idPromo, selectedPromoId, handleSelectPromoClick, indexButton }: TButtonPromo) {
  function onSelectPromoClick(evt: SyntheticEvent<HTMLImageElement>) {
    handleSelectPromoClick(evt.currentTarget.dataset.id as string, evt.currentTarget.dataset.count as string);
  }


  return (
    <li className="banner__button-promo">
      {selectedPromoId === idPromo
        ?
        <img src="../../../public/img/sprite/button-promo-active.svg" alt="" data-id={idPromo} data-count={indexButton} />
        :
        <img src="../../../public/img/sprite/button-promo-default.svg" alt="" data-id={idPromo} onClick={onSelectPromoClick} data-count={indexButton} />}
    </li>
  );
}
