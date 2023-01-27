import c from './CartTotal.module.scss';
import { FC } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { priceFormatter } from '../../../assets/functions/priceFormatter';

interface ICartTotalProps {
    goodsCount: number
    userCartLength: number
}

export const CartTotal: FC<ICartTotalProps> = ({ goodsCount, userCartLength }: ICartTotalProps) => {

    const totalSums = useAppSelector(s => s.auth.totalCartSum)
    let summary: number = 0;

    if (Object.keys(totalSums).length < userCartLength) {
        return <Preloader minFormat={true} />;
    }

    Object.keys(totalSums).forEach(elem => {
        summary += totalSums[elem];
    })
    const formattedSummary = priceFormatter(summary);

    return <div className={c.wrap}>

        <div className={c.line}>
            <div >товаров:</div>
            <div>{goodsCount}</div>
        </div>

        <div className={c.line}>
            <div>сумма:</div>
            <div className={c.bigInt}>{formattedSummary}</div>
        </div>

        <div className={c.shipline}>
            <p>Доставка по Санкт-Петербургу и области включена</p>
        </div>
    </div>




}
