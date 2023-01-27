import c from './Details.module.scss';
import { FC } from 'react';


type IDetails = {
    price: string
}

export const Details: FC<IDetails> = ({ price }: IDetails) => {


    return <div className={c.line}>

        <div className={c.subLine}>
            <div>
                <p>Цена оправы</p>
            </div>
            <div><p className={c.empty}>o</p></div>
            <div><p>{price}</p></div>
        </div>

        <div className={c.subLine}>
            <div>
                <p>Линзы</p>
            </div>
            <div>
                <p>1.50 стандарт</p></div>
            <div>
                <p className={c.arrtactive}>бесплатно</p>
            </div>
        </div>

    </div> 


}