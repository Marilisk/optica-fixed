import c from './CardPayVariety.module.scss';
import { FC } from 'react';
import { AngleIcon } from '../../../../../assets/icons/AngleIcon';
import card from './../../../../../assets/icons/creditCard.png'
import { CardInfoStrings } from './CardInfoStrings';


interface ICardPayVariety {
    isCardChosen: boolean
    setCardChosen: (arg: boolean) => void


}

export const CardPayVariety: FC<ICardPayVariety> = ({ isCardChosen, setCardChosen }: ICardPayVariety) => {

   

    return <div className={c.card} onClick={() => setCardChosen(!isCardChosen)}>
    <div className={c.imgWrapper}>
        <img alt='' src={card} />
    </div>
    <CardInfoStrings />
    {/* <div className={c.stringsWrapper} >
        <span className={c.headSpan}>Банковская карта</span>
        <span className={c.smallText}>MasterCard, Maestro, Visa, МИР, UnionPay</span>
    </div> */}
    <AngleIcon color={'#D8D1CA'} size={'14px'} margin={'36px 8px auto auto'} transform={'none'} showAnother={false} disabled={false} />
</div>
   
}
