import c from './Summary.module.scss';
import { FC, useEffect } from 'react';
import { OrderHeader } from '../OrderHeader/OrderHeader';
import { activeColEnum } from '../Order';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { SummaryCard } from './SummaryCard/SummaryCard';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '../../../../assets/common/Preloader/Preloader';
import { priceFormatter } from '../../../../assets/functions/priceFormatter';
import cl from '../Address/Address.module.scss';
import { fetchConFirmOrder } from '../../../../redux/authSlice';

interface ISummary {
    setActiveCol: (arg: activeColEnum) => void
    activeCol: activeColEnum
}

export const Summary: FC<ISummary> = ({ setActiveCol, activeCol }: ISummary) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const processedOrder = useAppSelector(s => s.products.processedOrder.order)
    
    useEffect( () => {
        if (activeCol === 'all' && !processedOrder) {
            navigate('/cart')
        }
    }, [activeCol, navigate, processedOrder])

    const confirmOrder = async () => {
        const response = await dispatch(fetchConFirmOrder())
        if (response.meta.requestStatus === 'fulfilled' ) {
            navigate(`/order/${processedOrder._id}`)
        }   
    }

    if (!processedOrder) {
        return <Preloader minFormat={true} />
    }

    const elements = processedOrder.cart.map((orderCartItem, i) => {
        return <SummaryCard key={i} orderCartItem={orderCartItem} />
    })

    let sum = 0;
    processedOrder.cart.forEach((item) => sum += item.price)
    let cost = priceFormatter(sum)

    return <>
        <OrderHeader>
            <div onClick={() => setActiveCol(activeColEnum.all)}>Подтверждение</div>
        </OrderHeader>

        <div className={c.wrap}>
            {elements}
        </div>

        <div className={c.cost} >
            <div>
                Доставка: <span>бесплатно</span>
            </div>
            <div>
                Итого: <span>{cost}</span>
            </div>
        </div>

        <div className={c.btnWrap} 
             style={(activeCol === activeColEnum.all) ? undefined : { display: 'none' }}>
            <button className={cl.submitBtn}
                onClick={() => confirmOrder()} >
                разместить заказ
            </button>
        </div>
    </>
}
