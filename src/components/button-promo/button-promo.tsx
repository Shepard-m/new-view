import { SyntheticEvent } from 'react';
import './button-promo-style.css';

type TButtonPromo = {
  idPromo: number;
  selectedPromoId: number;
  handleSelectPromoClick: (id: string) => void;
}

export default function ButtonPromo({ idPromo, selectedPromoId, handleSelectPromoClick }: TButtonPromo) {
  function onSelectPromoClick(evt: SyntheticEvent<HTMLImageElement>) {
    handleSelectPromoClick(evt.currentTarget.dataset.id as string);
  }
  return (
    <li className="banner__button-promo">
      {selectedPromoId === idPromo
        ?
        <img src="../../../public/img/sprite/button-promo-active.svg" alt="" data-id={idPromo} />
        :
        <img src="../../../public/img/sprite/button-promo-default.svg" alt="" data-id={idPromo} onClick={onSelectPromoClick} />}
    </li>
  );
}
