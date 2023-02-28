import c from './ProductCard.module.scss';
import defaultGlasses from './../../../assets/common/defaultGlasses.webp';
import { Heart } from './../../../assets/icons/Heart.jsx';
import { NavLink } from 'react-router-dom';
import { setCartInLSLength, setCurrentProd } from '../../../redux/productsSlice';
import { priceFormatter } from '../../../assets/functions/priceFormatter';
import { useState } from 'react';
import { CartIcon } from '../../../assets/header/icons/CartIcon';
import { fetchAddEyewearToCart, selectIsAuth } from '../../../redux/authSlice';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../redux/API/api';

export const addToCartOrLS = (isAuth, dispatch, productId) => {
    if (isAuth) {
        dispatch(fetchAddEyewearToCart({ productId, cat: "eyewear" }))
    } else {
        let newCartItem = { productId, quantity: 1, leftLens: 1, rightLens: 1, cat: "eyewear" }
        const lastCart = JSON.parse(localStorage.getItem('cart'))
        if (lastCart) {
            const good = lastCart.find(elem => elem.productId === productId)
            if (good) {
                good.quantity += 1;
            } else {
                lastCart.push(newCartItem)
            }
            localStorage.setItem('cart', JSON.stringify(lastCart))
            dispatch(setCartInLSLength(lastCart.length))
        } else {
            localStorage.setItem('cart', JSON.stringify([newCartItem]))
            dispatch(setCartInLSLength(1))
        }
    }
}

export const ProductCard = ({ dispatch,
    product,
    addToFavorites,
    removeFromFavorites,
    userFavorites,
    authIsLoading,
    inCartArray }) => {

    const price = priceFormatter(product.price)
    const isFavorite = userFavorites?.includes(product._id)
    const isInCart = inCartArray.includes(product._id)

    const isAuth = useSelector(selectIsAuth)

    const [isHovered, setIsHovered] = useState(null)

    return <div className={c.wrap}
        onClick={() => dispatch(setCurrentProd(product))}
        onMouseOver={() => setIsHovered(product._id)}
        onMouseLeave={() => setIsHovered(null)} >

        <NavLink to={`/product/${product._id}`}>
            <img src={product.imageUrl?.main ? `${API_URL}${product.imageUrl.main}` : defaultGlasses} alt='' />
            <div className={c.price}>
                {price}
            </div>
        </NavLink>

        <div className={c.like}>

                    {isFavorite ?
                        <div onClick={() => removeFromFavorites(product._id)} >
                            <svg fill={'#95009C'} width='18px' height='18px'
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Isolation_Mode" data-name="Isolation Mode">
                                <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                            </svg>
                        </div>
                        :
                        <div onClick={() => addToFavorites(product._id)} >
                            <Heart color={authIsLoading ? '#fff' : '#C899CC'} size={'18px'} />
                        </div>
                    }
                
        </div>

        {isHovered === product._id &&
            <div className={c.addToCart}>

                {isInCart ?
                    <div>в корзине</div>
                    :
                    <CartIcon color={'#95009C'} size={'24px'}
                        onClickCB={() => addToCartOrLS(isAuth, dispatch, product._id)}
                        disabled={authIsLoading} />
                }

            </div>
        }
        
    </div>
}