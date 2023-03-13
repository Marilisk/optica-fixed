import c from './Order.module.scss';
import { FC, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { Address } from './Address/Address';
import { Payment } from './Payment/Payment';
import { Summary } from './Summary/Summary';
import { LoadingStatusEnum } from '../../Types/types';

interface IOrder {
    authIsLoading: LoadingStatusEnum
}
export enum activeColEnum {
    address = 'address',
    payment = 'payment',
    all = 'all'
}

export const Order: FC<IOrder> = ({ authIsLoading } : IOrder) => {

    const user = useAppSelector(s => s.auth.loginData.data);
    
    const [activeCol, setActiveCol] = useState(activeColEnum.address)

    if (!user || authIsLoading === LoadingStatusEnum.loading ) {
        return <Preloader minFormat={false} />
    }

    return <>
        <div className={c.flex}>
            
            <div className={activeCol === 'address' ? c.col : c.passiveCol}
                style={(activeCol === activeColEnum.payment || activeColEnum.all )  ? {pointerEvents: 'all'} : undefined } >
                <Address userName={user.fullName}
                    setActiveCol={setActiveCol} activeCol={activeCol} />
            </div>

            <div className={activeCol === 'payment' ? c.col : c.passiveCol}
                style={activeCol === activeColEnum.all ? {pointerEvents: 'all'} : undefined } >
                <Payment setActiveCol={setActiveCol} activeCol={activeCol} />
            </div>

            <div className={activeCol === 'all' ? c.col : c.passiveCol}>
                <Summary setActiveCol={setActiveCol} activeCol={activeCol} />
            </div>

        </div>
    </>
}
