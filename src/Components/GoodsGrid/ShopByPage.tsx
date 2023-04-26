import { useEffect, FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import c from './ShopByPage.module.scss';
import { ShapeChoose } from './ShapeChoose/ShapeChoose';
import { Catalog } from '../common/Catalog/Catalog';
import { LoadingStatusEnum } from '../Types/types';
import { Preloader } from '../../assets/common/Preloader/Preloader';
import { FaceShapeChoose } from './FaceShapeChoose/FaceShapeChoose';
import { ColorChoose } from './ColorChoose/ColorChoose';


enum PageEnum {
    glassesShape = 'glassesShape',
    faceShape = 'faceShape',
    color = 'color',
}

export const ShopByPage: FC = () => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(s => s.products.products.items)
    const areProdsLoading = useAppSelector(s => s.products.products.status === LoadingStatusEnum.loading)
    const features = useAppSelector(s => s.filters.features)
    const userFavorites = useAppSelector(s => s.auth.loginData.data?.favourites)
    const authIsLoading = useAppSelector(s => s.auth.loginData.status)
    const [title, setTitle] = useState(features[0].name)
    const [page, setPage] = useState<PageEnum>()

    const location = useLocation()

    const [shape, chooseShape] = useState('круглые')
    const [faceShape, chooseFaceShape] = useState('для круглого лица')
    const [color, chooseColor] = useState('чёрный')

    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        switch (location.pathname) {
            case '/shopby/eyewearform':
                setPage(PageEnum.glassesShape);
                setTitle('Подбор по форме оправы')
                const filtered = products.filter(product => product.shape.includes(shape))
                setFilteredProducts(filtered)
                break;
            case '/shopby/faceshape':
                setPage(PageEnum.faceShape)
                setTitle('Подбор по форме лица')
                const filteredByF = products.filter(product => product.features.includes(faceShape))
                setFilteredProducts(filteredByF)
                break;
            case '/shopby/color':
                setPage(PageEnum.color)
                setTitle('Подбор по цвету')
                const filteredByC = products.filter(product => product.color.includes(color))
                setFilteredProducts(filteredByC)
                break;
        }
    }, [location.pathname, shape, products, faceShape, color])

    if (areProdsLoading) {
        return <Preloader minFormat={true} />
    } 

    return <div className={c.wrapper}>

        <div className={c.box}>
            <div className={c.firstLine}>
                <h2>{title}</h2>

            </div>

            {page === PageEnum.glassesShape && <ShapeChoose amount={filteredProducts.length} shape={shape} chooseShape={chooseShape} />}

            {page === PageEnum.faceShape && <FaceShapeChoose amount={filteredProducts.length} shape={faceShape} chooseShape={chooseFaceShape} />}
            
            {page === PageEnum.color && <ColorChoose amount={filteredProducts.length} 
                        color={color} 
                        chooseColor={chooseColor} />}

        </div>

        <Catalog dispatch={dispatch}
            products={filteredProducts}
            areProdsLoading={areProdsLoading}
            userFavorites={userFavorites}
            authIsLoading={authIsLoading} />

    </div>
}