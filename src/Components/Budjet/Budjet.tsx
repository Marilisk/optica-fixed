import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import { clearAllFilters } from '../../redux/featuresSlice';
import { Catalog } from '../common/Catalog/Catalog';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams } from 'react-router-dom';


export const Budjet = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.products)
    const areProdsLoading = products.status === 'isLoading';
    const authIsLoading = useAppSelector(state => state.auth.loginData.status === 'loading')
    const userFavorites = useAppSelector(state => state.auth.loginData.data?.favourites);

    const params = useParams()


    useEffect(() => {
        dispatch(clearAllFilters());
    })

    const filteredProducts = products.items.filter(el => el.price < Number(params.sum))

    return <>
        <BreadCrumbs text={`Оправы до ${params.sum} рублей`} />

        <FiltersDashboard />

        <Catalog dispatch={dispatch} 
                products={filteredProducts}
                areProdsLoading={areProdsLoading}
                userFavorites={userFavorites}
                authIsLoading={authIsLoading} />

        
    </>
}