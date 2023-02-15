import c from './LensPage.module.scss';
import { fetchAddEyewearToCart, selectIsAuth, selectIsManager } from '../../../redux/authSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FC, useEffect, useState } from 'react';
import { CatEnum, ILensProduct, LoadingStatusEnum } from '../../Types/types';
import { BreadCrumbs } from '../../common/BreadCrumbs/BreadCrumbs';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { fetchLens } from '../../../redux/lensesSlice';
import { Photos } from '../../common/ProductPage/Photos/Photos';
import { LensesSpecifications } from './LensesSpecifications/LensesSpecifications';
import { priceFormatter } from '../../../assets/functions/priceFormatter';
import { LensPrice } from './LensPrice/LensPrice';
import { LensCustomerBtns } from './LensCustomerBtns/LensCustomerBtns';
import { LensChoice } from './LensChoice/LensChoice';
import { setCartInLSLength } from '../../../redux/productsSlice';

interface ILensPage {
    addToFavorites: (arg: string) => void
    removeFromFavorites: (arg: string) => void
    authIsLoading: LoadingStatusEnum
    userFavorites: string[]
}

export const addToCartOrLS = (isAuth:boolean, dispatch, productId:string, lens: number) => {
    if (isAuth) {
        dispatch(fetchAddEyewearToCart({productId, cat: CatEnum.contactLens, lens }))
    } else {
        let newCartItem = {productId, quantity: 1, leftLens: lens, rightLens: lens, cat: CatEnum.contactLens }
        const lastCart = JSON.parse(localStorage.getItem('cart'))
        if (lastCart) {
            const good = lastCart.find(elem => elem.productId === productId && elem.leftLens === lens)
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

export const LensPage:FC = ({ authIsLoading }:ILensPage) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.products.currentProduct.status);
    const product = useAppSelector<ILensProduct>(state => state.lenses.currentProduct.item);

    const IsManager = useAppSelector(selectIsManager)
    const isAuth = useAppSelector(selectIsAuth)
    const params = useParams();

    const [lens, setLens] = useState(0)

    const addToCart = () => {
        addToCartOrLS(isAuth, dispatch, product._id, lens )
    }

    useEffect(() => {
        dispatch(fetchLens(params.id))
    }, [params.id, dispatch])

    if (status === LoadingStatusEnum.loading || !product) {
        return <Preloader minFormat={true} />;
    }

    const price = priceFormatter(product.price)

    return <>
        <div className={c.wrap}>
            <BreadCrumbs text={`Контактные линзы. ${product.brand} `} />
            <div className={c.flexWrapper}>

                <Photos imageUrl={product.imageUrl} />

                <div className={c.rightPart}>
                    <h2>{product.brand}</h2>
                    <div className={c.description}>{product.description}</div>

                    <LensPrice price={price} />

                    <div>
                        <h4>радиус кривизны: {product.BC}</h4>
                         
                    </div>                  

                    <LensChoice nums={product.prescription} setLens={setLens}  />

                    <LensCustomerBtns authIsLoading={authIsLoading}
                        prodLoadingStatus={status}
                        addToCart={addToCart}
                        lens={lens}  />

                </div>
            </div>
        </div>

        <LensesSpecifications product={product} IsManager={IsManager} />

    </>
}