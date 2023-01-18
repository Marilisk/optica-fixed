import c from './CartProductCard.module.scss';
import { useEffect, useState, FC } from 'react';
import instance from '../../../redux/API/api';
import { Preloader } from '../../../assets/common/Preloader/Preloader.jsx';
import { ICartItem, IProduct } from '../../Types/types';
import { LeftCol } from '../LeftCol/LeftCol';
import { RightCol } from '../RightCol/RightCol';

interface CartProductCardProps {
    cartItem: ICartItem,
    authIsLoading: string;
    cartItemIndex: number
}

export const CartProductCard: FC<CartProductCardProps> = ({ cartItem, authIsLoading, cartItemIndex }: CartProductCardProps,) => {
     
    const [product, setProduct] = useState<IProduct | null>();

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(`/products/${cartItem.productId}`);
            //console.log('productCard ', response)
            setProduct(response.data);
        }
        fetchData();
    }, [cartItem.productId]);

    if (!product) {
        return <Preloader minFormat={true} />;
    }
    

    return <div className={c.wrap} >

        <LeftCol productId={cartItem.productId} imageUrlMain={product.imageUrl.main} />

        <RightCol product={product} 
                  cartItem={cartItem}
                  authIsLoading={authIsLoading}
                  cartItemIndex={cartItemIndex} />

    </div>
}