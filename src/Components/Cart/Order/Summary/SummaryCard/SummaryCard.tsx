import c from './SummaryCard.module.scss';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../../redux/hooks';
import { fetchProd } from '../../../../../redux/productsSlice';
import { CatEnum, ICartItemWithSum, IProduct } from '../../../../Types/types';
import { Preloader } from '../../../../../assets/common/Preloader/Preloader';
import { AngleIcon } from '../../../../../assets/icons/AngleIcon';
import { fetchLens } from '../../../../../redux/lensesSlice';
import { API_URL } from '../../../../../redux/API/api';

interface ISummaryCard {
    orderCartItem: ICartItemWithSum
}

export const SummaryCard: FC<ISummaryCard> = ({ orderCartItem }: ISummaryCard) => {
    const dispatch = useAppDispatch()
    const [product, setProduct] = useState<IProduct>(null)
    const [showDetails, toggleShowDetails] = useState(false);

    const fetchThisProduct = useCallback(async () => {
        const response = orderCartItem.cat === CatEnum.eyewear ?
            await dispatch(fetchProd(orderCartItem.productId)) :
            await dispatch(fetchLens(orderCartItem.productId))
        setProduct(response.payload)
    }, [orderCartItem.productId, dispatch, orderCartItem.cat])

    useEffect(() => {
        fetchThisProduct()
    }, [orderCartItem.productId, fetchThisProduct])

    if (!product) {
        return <Preloader minFormat={true} />
    }

    return <div className={c.wrap}>

        <div className={c.imgWrap}>
            <img alt='' src={`${API_URL}${product.imageUrl.main}`} />
        </div>

        <div className={c.flex}>

            <div>{product.code}</div>
            <div>{product.name}</div>
            <div>
                <div className={c.name}>кол-во:</div>
                {orderCartItem.quantity}
            </div>

            <div onClick={() => toggleShowDetails(!showDetails)} className={c.showDetailsBtn} >
                <div>Детали</div>
                <AngleIcon color={'#95009C'} size={'12px'} transform={'rotate(90deg)'}
                    margin={'4px auto auto 6px'} showAnother={() => toggleShowDetails(!showDetails)} disabled={false} />
            </div>

        </div>

        <div className={c.details} style={showDetails ? { display: 'block' } : { display: 'none' }}>
            <div className={c.name} >Линзы: </div>
            <div>левая: {orderCartItem.leftLens} | </div>
            
            {orderCartItem.cat === CatEnum.eyewear &&
                <div>правая: {orderCartItem.rightLens} </div>}
        </div>

    </div>
}
