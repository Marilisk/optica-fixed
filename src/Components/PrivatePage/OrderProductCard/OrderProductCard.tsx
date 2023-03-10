import c from './OrderProductCard.module.scss';
import React, { useEffect, FC, useState } from 'react';
import { ILensProduct, IProduct } from '../../Types/types';
import instance, { API_URL } from '../../../redux/API/api';
import { LoadingDots } from '../../../assets/common/Preloader/LoadingDots/LoadingDots';

interface IOrderProductCard {
    productId: string
}

export const fetchProduct = async (productId: string, setProduct: (arg: IProduct | ILensProduct) => void) => {
    try {
        const response = await instance.get(`/products/${productId}`)
        console.log(response.data)
        setProduct(response.data)
    } catch (error) {
        console.log(error)
    }
}
const OrderProductCard: FC<IOrderProductCard> = ({ productId }: IOrderProductCard) => {
    const [product, setProduct] = useState<IProduct | ILensProduct>(null)

    useEffect(() => {
        fetchProduct(productId, setProduct)
    }, [productId])

    if (!product) {
        return <LoadingDots />
    }




    return <div className={c.card}>

        <div>
            
        </div>

        <div className={c.imgWrap}>
            <img alt='' src={`${API_URL}${product.imageUrl.main}`} />
        </div>

        <div>

        </div>

        <div>

        </div>

        <div>

        </div>



    </div>
}

export default React.memo(OrderProductCard)

