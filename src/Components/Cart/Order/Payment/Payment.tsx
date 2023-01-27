import c from './Payment.module.scss';
import { FC, useState } from 'react';
import { OrderHeader } from '../OrderHeader/OrderHeader';
import { PayForm } from './PayForm/PayForm';
import { CardPayVariety } from './CardPayVariety/CardPayVariety';

interface IPayment {
    setActiveCol: (arg: 'all') => void


}

export const Payment: FC<IPayment> = ({ setActiveCol }: IPayment) => {

    const [isCardChosen, setCardChosen] = useState(false)



    return <>
        <OrderHeader>
            <div>Детали платежа</div>
        </OrderHeader>
        <div className={c.wrap}>

            {isCardChosen ?
                <PayForm isCardChosen={isCardChosen} setCardChosen={setCardChosen} sum={1000} />
                :
                <CardPayVariety isCardChosen={isCardChosen} setCardChosen={setCardChosen}/>
            }

        </div>
    </>
}
