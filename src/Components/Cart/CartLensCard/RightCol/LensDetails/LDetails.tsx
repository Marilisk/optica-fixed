import c from './LDetails.module.scss';
import { FC } from 'react';


type IDetailsType = {
    price: string
}

export const LDetails: FC<IDetailsType> = ({ price }: IDetailsType) => {


    return <div className={c.line}>

        <div className={c.subLine}>
            <div>
                <p>Цена оправы</p>
            </div>
            <div><p className={c.empty}>o</p></div>
            <div><p>{price}</p></div>
        </div>

    </div> 


}