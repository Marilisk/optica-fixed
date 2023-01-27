import c from './CardPayVariety.module.scss';
import { FC } from 'react';



export const CardInfoStrings: FC = () => {

   

    return <div className={c.stringsWrapper} >
        <span className={c.headSpan}>Банковская карта</span>
        <span className={c.smallText}>MasterCard, Maestro, Visa, МИР, UnionPay</span>
    </div>
    
   
}
