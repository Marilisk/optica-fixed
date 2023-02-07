import c from './Payment.module.scss';
import { FC, useState } from 'react';
import { OrderHeader } from '../OrderHeader/OrderHeader';
import { PayForm } from './PayForm/PayForm';
import { CardPayVariety } from './CardPayVariety/CardPayVariety';
import { activeColEnum } from '../Order';
import { CashPayVariety } from './CashPayVariety/CashPayVariety';
import btnCl from '../Address/Address.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchEditOrder } from '../../../../redux/authSlice';
import { setProcessedOrder } from '../../../../redux/productsSlice';


interface IPayment {
    setActiveCol: (arg: activeColEnum) => void
    activeCol: activeColEnum
}

export const Payment: FC<IPayment> = ({ setActiveCol, activeCol }: IPayment) => {
    const dispatch = useAppDispatch()
    const cartWithSum = useAppSelector(s => s.products.currentCartWithSums.items)
    const orderIsPaid = useAppSelector(s => s.products.processedOrder.order?.paymentMade)
    const [isCardChosen, setCardChosen] = useState(false)

    let sum = 0;
    cartWithSum.forEach((item) => sum += item.price)

    const editOrder = async () => {
        try {
            const order = await dispatch(fetchEditOrder(isCardChosen))
            console.log(order)
            dispatch(setProcessedOrder(order.payload))
            setActiveCol(activeColEnum.all)
        } catch (error) {
            console.log('edit order error', error)
        }
    }

    let canGo = false;
    if (!isCardChosen || (isCardChosen && orderIsPaid)) {
        canGo = true
    }

    return <>
        <OrderHeader >
            <div onClick={() => setActiveCol(activeColEnum.payment)}>Детали платежа</div>
        </OrderHeader>

        <div className={c.wrap}>

            {isCardChosen ?
                <PayForm isCardChosen={isCardChosen} setCardChosen={setCardChosen} sum={sum}
                    activeCol={activeCol}
                    setActiveCol={setActiveCol} />
                :
                <>
                    <CashPayVariety isCardChosen={isCardChosen} setCardChosen={setCardChosen} />
                    <CardPayVariety isCardChosen={isCardChosen} setCardChosen={setCardChosen} />
                </>
            }

            <div className={c.btnWrap}>
                <button type='submit' className={btnCl.submitBtn}
                    onClick={() => editOrder()}
                    style={(activeCol === activeColEnum.payment/*  && canGo */) ?
                        null : { display: 'none' }}
                    disabled={!canGo} >
                    дальше
                </button>
            </div>

        </div>
    </>
}
