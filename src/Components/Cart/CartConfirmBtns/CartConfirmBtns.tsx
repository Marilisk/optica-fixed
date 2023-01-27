import { FC } from 'react';
import c from './CartConfirmBtns.module.scss';

interface CartConfirmBtnsProps {
    authIsLoading: string
    confirmOrder: () => void
    navigate: (arg: string) => void
}

export const CartConfirmBtns: FC<CartConfirmBtnsProps> = ({ authIsLoading, confirmOrder, navigate }: CartConfirmBtnsProps) => {



    return <div className={c.btnWrap} >


        <button type='button' className={c.favBtn}
            disabled={authIsLoading === 'loading'}
            onClick={() => confirmOrder()} >
            <span>оформление</span>

        </button>


        <button type='button' className={c.addBtn}
            disabled={authIsLoading === 'loading'}
            onClick={() => navigate('/')}>
            в каталог
        </button>
    </div>


}