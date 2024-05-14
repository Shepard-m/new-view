import { useState, useCallback } from 'react';
import { useAppDispatch } from '../../hooks/indexStore';
import { promosActions } from '../../store/slice/promo/promo';
import { TPromo } from '../../types/promo';
import ButtonPromo from '../button-promo/button-promo';


import './buttons-promo-style.css';
type TButtonsPromo = {
  promos: TPromo[];
  promo: TPromo;
}



export default function ButtonsPromo({ promos, promo }: TButtonsPromo) {
  const dispatch = useAppDispatch();

  // let [step, setStep] = useState(0);
  // const selectPromo = setInterval(() => {
  //   setStep(step++);

  //   if (step === promos?.length) {
  //     setStep(0);
  //     dispatch(promosActions.selectPromo({ id: `${promos[0].id}` }));
  //     return;
  //   }
  //   dispatch(promosActions.selectPromo({ id: `${promos[step].id}` }));

  // }, 3000);

  // useCallback(() => selectPromo, []);

  function handleSelectPromoClick(id: string) {
    dispatch(promosActions.selectPromo({ id }));
  }

  return (
    <ul className="banner__buttons-promo">
      {promos.map((item) => <ButtonPromo key={item.id} idPromo={item.id} selectedPromoId={promo.id} handleSelectPromoClick={handleSelectPromoClick} />)}
    </ul>
  );
}
