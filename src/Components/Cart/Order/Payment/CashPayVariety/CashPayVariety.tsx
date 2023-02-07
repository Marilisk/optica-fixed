import c from './CashPayVariety.module.scss';
import { FC } from 'react';
import ch from '../../../../../assets/form_elements/CustomCheckbox/CustomCheckbox.module.scss';



interface ICashPayVariety {
    isCardChosen: boolean
    setCardChosen: (arg: boolean) => void
}

export const CashPayVariety: FC<ICashPayVariety> = ({ isCardChosen, setCardChosen }: ICashPayVariety) => {


    return <div className={c.card} onClick={() => setCardChosen(false)}>

        <div className={!isCardChosen ? ch.checked : ch.checkWrap}>          
            <input type='checkbox'
                //checked={!isCardChosen}
                
                name='isCashChosen'
                onChange={() => setCardChosen(!isCardChosen)} />
        </div>

        <div className={c.smallText}>Оплата наличными или картой при получении</div>

    </div>

}
