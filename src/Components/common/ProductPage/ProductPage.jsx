import c from './ProductPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
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


export const ProductPage = () => {
    const dispatch = useDispatch();

    const authIsLoading = useSelector(s => s.auth.loginData.status)
    const status = useSelector(state => state.products.currentProduct.status);
    const product = useSelector(state => state.products.currentProduct.item);

    const IsManager = useSelector(selectIsManager)
    const isAuth = useSelector(selectIsAuth)

    const params = useParams();
    const userFavorites = useSelector(s => s.auth.loginData.data?.favourites)
    const isFavorite = userFavorites?.includes(params.id);

    const addToFavorites = (productId) => {
        if (!isAuth) {
            dispatch(switchAuthOfferModal(true))
        } else {
            dispatch(fetchAddToFavorites(productId))
        }
    } 
    const removeFromFavorites = (productId) => {
        dispatch(fetchRemoveFromFavorites(productId))
    } 

    const addToCart = () => {
        addToCartOrLS(isAuth, dispatch, product._id)
    }

    useEffect(() => {
        dispatch(fetchProd(params.id))
    }, [params.id, dispatch])

    if (status === 'loading' || !product) {
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