import c from './ProductPage.module.scss';
import { fetchProd } from '../../../redux/productsSlice';
import { fetchAddToFavorites, fetchRemoveFromFavorites, selectIsAuth, selectIsManager } from '../../../redux/authSlice';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EyewearSize } from './EyewearSize/EyewearSize';
import { Photos } from './Photos/Photos';
import { Specifications } from './Specifications/Specifications';
import { Price } from './Price/Price';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { CustomerButtons } from './CustomerButtons/CustomerButtons';
import { priceFormatter } from '../../../assets/functions/priceFormatter';
import { addToCartOrLS } from '../ProductCard/ProductCard';
import { switchAuthOfferModal } from '../../../redux/headerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { LoadingStatusEnum } from '../../Types/types';


export const ProductPage = () => {
    const dispatch = useAppDispatch();

    const authIsLoading = useAppSelector(s => s.auth.loginData.status)
    const status = useAppSelector(state => state.products.currentProduct.status);
    const product = useAppSelector(state => state.products.currentProduct.item);

    const IsManager = useAppSelector(selectIsManager)
    const isAuth = useAppSelector(selectIsAuth)

    const params = useParams();
    const userFavorites = useAppSelector(s => s.auth.loginData.data?.favourites)
    const isFavorite = userFavorites?.includes(params.id);

    const userCart = useAppSelector(s => s.auth.loginData.data?.cart)
    const unLogginedUserCart = useAppSelector(s => s.products.unloginnedCart)
    const isInCart = isAuth ?
        userCart?.find(elem => elem.productId === params.id) :
        unLogginedUserCart.find(elem => elem.productId === params.id)

    const addToFavorites = (productId: string) => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
        } else {
            dispatch(fetchAddToFavorites(productId))
        }
    } 
    const removeFromFavorites = (productId: string) => {
        dispatch(fetchRemoveFromFavorites(productId))
    } 

    const addToCart = () => {
        addToCartOrLS(isAuth, dispatch, product._id)
    }

    useEffect(() => {
        dispatch(fetchProd(params.id))
    }, [params.id, dispatch])

    if (status === LoadingStatusEnum.loading || !product) {
        return <Preloader minFormat={true} />;
    }

    const price = priceFormatter(product.price)
    const maleGender = product.gender.includes('Мужские')

    return <>
        <div className={c.wrap}>
            <BreadCrumbs text={`${maleGender ? 'Мужские' : 'Женские'} очки. ${product.name} `} />
            <div className={c.flexWrapper}>

                <Photos imageUrl={product.imageUrl} />

                <div className={c.rightPart}>
                    <h2>{product.name}</h2>

                    <EyewearSize size={product.size} />
                    <Price price={price} />

                    <CustomerButtons isFavorite={isFavorite}
                        isInCart={isInCart}
                        authIsLoading={authIsLoading}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                        productId={product._id}
                        prodLoadingStatus={status}
                        addToCart={addToCart} />

                </div>
            </div>
        </div>

        <Specifications product={product} dispatch={dispatch} IsManager={IsManager} />

    </>
}