import c from './OrderProductCard.module.scss';
import React, { useEffect, FC, useState } from 'react';
import { CatEnum, ILensProduct, IProduct } from '../../Types/types';
import instance, { API_URL } from '../../../redux/API/api';
import { LoadingDots } from '../../../assets/common/Preloader/LoadingDots/LoadingDots';

interface IOrderProductCard {
    productId: string
    cat: CatEnum
}

export const fetchProduct = 
    async (productId: string, setProduct: (arg: IProduct | ILensProduct) => void, cat:CatEnum) => {
    try {
        const response = cat === CatEnum.eyewear ?
             await instance.get(`/products/${productId}`)
             :
             await instance.get(`/lenses/${productId}`)
        setProduct(response.data)
    } catch (error) {
        console.log(error)
    }
}
const OrderProductCard: FC<IOrderProductCard> = ({ productId, cat }: IOrderProductCard) => {
    const [product, setProduct] = useState<IProduct | ILensProduct>()

    useEffect(() => {
        fetchProduct(productId, setProduct, cat )
    }, [productId, cat])

    if (!product) {
        return <LoadingDots />
    }

    return <div className={c.card}>

        <div className={c.imgWrap}>
            <img alt='' src={`${API_URL}${product.imageUrl.main}`} />
        </div>

    </div>
}

export default React.memo(OrderProductCard)

