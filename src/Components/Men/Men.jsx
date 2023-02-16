import c from './Men.module.scss';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllFilters } from '../../redux/featuresSlice';
import { Catalog } from '../common/Catalog/Catalog';
import { useEffect } from 'react';


export const Men = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products)
    const areProdsLoading = products.status === 'isLoading';
    const authIsLoading = useSelector(state => state.auth.loginData.status === 'loading')
    const userFavorites = useSelector(state => state.auth.loginData.data?.favourites);

    useEffect(() => {
        dispatch(clearAllFilters());
    })

    const genderFilteredProducts = products.items.filter(el => el.gender.includes('Мужские'))

    return <>
        <BreadCrumbs text={'Мужские очки'} />

        <section className={c.mainSection}>
            <div className={c.mainDescription}>
                <div className={c.mainDescriptionWrap}>
                    <h2>
                        Мужские очки
                    </h2>
                    <p>
                        Продаём оправы самых разных форм и типов. Подберём подходящую для любой формы лица. Найдутся очки на любой случай - и для расслабленного ношения, и под деловой лук.
                    </p>
                </div>
            </div>
            <div className={c.mainImgBlock}/>

        </section>

        <FiltersDashboard />

        <Catalog dispatch={dispatch} 
                products={genderFilteredProducts}
                areProdsLoading={areProdsLoading}
                userFavorites={userFavorites}
                authIsLoading={authIsLoading} />

        
    </>
}