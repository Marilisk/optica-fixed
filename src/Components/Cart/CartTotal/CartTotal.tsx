import c from './CartTotal.module.scss';
import React, { FC } from 'react';
import { useAppDispatch } from '../../../redux/hooks';

interface ICartTotalProps {
    goodsCount: number
}

export const CartTotal: FC<ICartTotalProps> = ({goodsCount}: ICartTotalProps) => {
        


   /*  if (userCart == null) {
        return <Preloader minFormat={true} />;
    } */

    return <div className={c.wrap}>
        <div className={c.line}>
            <div >товаров:</div>
            <div>{goodsCount}</div>
        </div>
        <div className={c.line}>Всего (рублей):</div>

        <div className={c.line}>Доставка не включена</div>
         
            

        </div>

    


}
