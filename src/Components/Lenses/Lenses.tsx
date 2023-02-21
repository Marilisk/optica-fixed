import c from './Lenses.module.scss';
import { BreadCrumbs } from '../common/BreadCrumbs/BreadCrumbs';
import { FC, useEffect } from 'react';
import { fetchLenses } from '../../redux/lensesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LoadingStatusEnum } from '../Types/types';
import { LensFiltersDashboard } from '../common/FiltersDashboard/LensFiltersDashboard';
import { LensCatalog } from '../common/LensCatalog/LensCatalog';


export const Lenses:FC = () => {
    const products = useAppSelector(state => state.lenses.products)
    const areProdsLoading = products.status === LoadingStatusEnum.loading;
    const dispatch = useAppDispatch();
    
    useEffect(()=> {
        dispatch(fetchLenses())
    }, [dispatch]);

    return <>
        <BreadCrumbs text={'Контактные линзы'} />

        <section className={c.mainSection}>
            <div className={c.mainDescription}>
                <div className={c.mainDescriptionWrap}>
                    <h2>
                        Контактные линзы
                    </h2>
                    <p>
                        от проверенных производителей с доставкой от двух часов
                    </p>
                </div>
            </div>
            <div className={c.mainImgBlock}>

            </div>

        </section>

        <LensFiltersDashboard />

        <LensCatalog products={products.items}
                areProdsLoading={areProdsLoading} />
        
    </>
}
