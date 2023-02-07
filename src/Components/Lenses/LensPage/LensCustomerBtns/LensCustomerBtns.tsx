import c from './LensCustomerBtns.module.scss';
import { FC } from 'react';
import { LoadingStatusEnum } from '../../../Types/types';

interface ICustomerButtons {
    authIsLoading: LoadingStatusEnum
    prodLoadingStatus: LoadingStatusEnum
    addToCart: () => void
    lens: number
}

export const LensCustomerBtns:FC<ICustomerButtons> = ({ authIsLoading, prodLoadingStatus, addToCart, lens }) => {

    return <div className={c.btnWrap} >

        <button type='button' className={c.addBtn}
            disabled={authIsLoading === LoadingStatusEnum.loading || prodLoadingStatus === LoadingStatusEnum.loading}
            onClick={() => addToCart()}>
            в корзину {Boolean(lens) && <span className={c.dpt}>({lens} диоптрий)</span>}
        </button>
    </div>


}