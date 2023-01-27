import c from './Order.module.scss';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { Address } from './Address/Address';
import { Payment } from './Payment/Payment';
import { Summary } from './Summary/Summary';

interface IOrder {
    authIsLoading: string
    confirmOrder: () => void
    navigate: (arg: string) => void
}

export const Order: FC<IOrder> = ({ authIsLoading, confirmOrder, navigate } : IOrder) => {

    const user = useAppSelector(s => s.auth.loginData.data);
    
    const [activeCol, setActiveCol] = useState('address')

    useEffect(() => {
        /* if (!isAuth) {
            navigate('/');
        } */
    })

    if (!user) {
        return <Preloader minFormat={false} />
    }
        

    return <>
        
        <div className={c.flex}>
            
            <div className={activeCol === 'address' ? c.col : c.passiveCol}>
                <Address userName={user.fullName}
                    setActiveCol={setActiveCol} />
            </div>

            <div className={activeCol === 'payment' ? c.col : c.passiveCol}>
                <Payment setActiveCol={setActiveCol} />
            </div>

            <div className={activeCol === 'all' ? c.col : c.passiveCol}>
                <Summary setActiveCol={setActiveCol} />
            </div>

        </div>
    </>
}
