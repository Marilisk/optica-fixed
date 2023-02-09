import { useEffect, FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FiltersDashboard } from '../common/FiltersDashboard/FiltersDashboard';
import c from './GoodsGrid.module.scss';
import roundShape from './../../assets/mainPage/roundShape.png'
import cateyeShape from './../../assets/mainPage/cateyeShape.png'
import { SortBoard } from '../common/FiltersDashboard/SortBoard/SortBoard';



enum PageEnum {
    glassesShape = 'glassesShape',
    faceShape = 'faceShape',
    color = 'color',
}

interface IGoodsGridProps {

}

export const GoodsGrid: FC<IGoodsGridProps> = ({ }: IGoodsGridProps) => {
    const dispatch = useAppDispatch()
    const products = useAppSelector(s => s.products.products.items)
    const features = useAppSelector(s => s.filters.features)
    const [title, setTitle] = useState(features[0].name)


    const location = useLocation()
    console.log(location)
    let page: PageEnum;

    useEffect(() => {
        switch (location.pathname) {
            case '/shopby/eyewearform':
                page = PageEnum.glassesShape;
                setTitle('Подбор по форме оправы')
                break;
            case '/shopby/faceshape':
                page = PageEnum.faceShape;
                setTitle('Подбор по форме лица')
                break;
            case '/shopby/color':
                page = PageEnum.color;
                setTitle('Подбор по цвету')
                break;
        }
    }, [location.pathname])


    useEffect(() => {

    }, [dispatch]);




    return <>

        <div className={c.firstLine}>
            <h2>{title}</h2>

        </div>

        <div className={c.shapeChoseWrap}>
            <div>
                <img alt='shape' src={roundShape} />
                <img alt='shape' src={cateyeShape} />
            </div>

            <div>
                <SortBoard />
            </div>

        </div>






    </>
}