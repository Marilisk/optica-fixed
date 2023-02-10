import c from './FavoriteProductCard.module.scss';
import { NavLink } from 'react-router-dom';
import { setCurrentProd } from '../../../redux/productsSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import instance from '../../../redux/API/api';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { CartIcon } from '../../../assets/header/icons/CartIcon';
import { fetchAddEyewearToCart } from '../../../redux/authSlice';
import { priceFormatter } from '../../../assets/functions/priceFormatter';
import { LoadingDots } from '../../../assets/common/Preloader/LoadingDots/LoadingDots';


export const FavoriteProductCard = ({ id, removeFromFavorites, authIsLoading, inCartArray }) => {
    const dispatch = useDispatch();

    const [product, setProduct] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(`/products/${id}`);
            setProduct(response.data);
        }
        fetchData();
    }, [id]);

    if (!Object.keys(product).length) {
        //return <Preloader minFormat={true} />;
        return <LoadingDots />;
    }
    const price = priceFormatter(product.price) 
    const isInCart = inCartArray.includes(id) 

    return <div className={c.wrap} onClick={() => dispatch(setCurrentProd(product))} >

        <NavLink to={`/product/${product._id}`}>
            <img src={`https://backend-optics-without-packlo.onrender.com${product.imageUrl.main}`} alt='' />
            <div className={c.price}>
                {price}
            </div>
        </NavLink>

        <div className={c.like}>
            <div onClick={() => authIsLoading=== 'loading' ? false : removeFromFavorites(id)} >
                <svg fill={authIsLoading=== 'loading' ? '#D8D1CA' : '#95009C'} width='18px' height='18px'
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Isolation_Mode" data-name="Isolation Mode">
                    <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                </svg>
            </div>
        </div>

        <div className={c.cart}>
            
            {isInCart ? <div>в корзине</div>
             : 
             <CartIcon color={'#95009C'} size={'24px'}
                      onClickCB={() => dispatch(fetchAddEyewearToCart(id))}
                      disabled={authIsLoading === 'loading'} />}

        </div>
    </div>
}