import c from './Summary.module.scss';
import { FC } from 'react';
import { OrderHeader } from '../OrderHeader/OrderHeader';

interface ISummary {
    setActiveCol: (arg: 'all') => void

}

export const Summary: FC<ISummary> = ({ setActiveCol }: ISummary) => {





    return <>
        <OrderHeader>
            <div>Подтверждение</div>
        </OrderHeader>

        <div className={c.wrap}>



        </div>
    </>
}
