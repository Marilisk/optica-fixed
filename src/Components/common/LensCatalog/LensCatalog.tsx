import c from './LensCatalog.module.scss';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import { LensCard } from '../LensCard/LensCard';
import { useFilterLens } from '../../../assets/functions/useFilterLens';
import { FC } from 'react';
import { ILensProduct } from '../../Types/types';
import { useAppSelector } from '../../../redux/hooks';
import { useSortLenses } from '../../../assets/functions/useSortLenses';

interface ILensCatalogProps {
    areProdsLoading: boolean
    products: ILensProduct[]
}

export const LensCatalog: FC<ILensCatalogProps> = ({ products, areProdsLoading }: ILensCatalogProps) => {

    let filteredLenses = useFilterLens(products)
    const sortedLenses = useSortLenses(filteredLenses)
    const userCart = useAppSelector(s => s.auth.loginData.data?.cart)

    if (areProdsLoading) {
        return <Preloader minFormat={true} />;
    }

    const inCartArray = [];
    if (userCart) {
        userCart.forEach(elem => {
            inCartArray.push(elem.productId);
        });
    }

    if (!filteredLenses.length) {
        return <div className={c.emptyNote}>Таких линз пока не завезли. Измените фильтры.</div>
    }
    return <div className={c.catGrid}>
        {sortedLenses.map(product => <LensCard key={product._id}
            inCartArray={inCartArray} product={product} />
        )}
    </div>
}


