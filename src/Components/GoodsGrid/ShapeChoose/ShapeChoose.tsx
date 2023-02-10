import { useEffect, FC, useState } from 'react';
import c from './ShapeChoose.module.scss';
import roundShape from './../../../assets/mainPage/roundShape.png'
import cateyeShape from './../../../assets/mainPage/cateyeShape.png'
import aviatorsShape from './../../../assets/mainPage/aviatorsShape.png'
import rectangleShape from './../../../assets/mainPage/rectangleShape.png'
import eyebrowShape from './../../../assets/mainPage/eyebrowShape.png'
import squareShape from './../../../assets/mainPage/squareShape.png'
import { SortBoard } from '../../common/FiltersDashboard/SortBoard/SortBoard';

interface IShapeChooseProps {
    shape: string
    chooseShape: (arg: string) => void
}

export const ShapeChoose: FC<IShapeChooseProps> = ({shape, chooseShape}: IShapeChooseProps) => {



    return <div className={c.wrapper}>


        <div className={c.shapeChoseWrap}>

            <div className={shape === 'круглые' ? c.chosenBlock : c.block}
                onClick={() => chooseShape('круглые')} >
                <img alt='shape' src={roundShape} />
                круглые
            </div>

            <div className={shape === 'cat eye' ? c.chosenBlock : c.block}
                onClick={() => chooseShape('cat eye')} >
                <img alt='shape' src={cateyeShape} />
                кошачий глаз
            </div>

            <div className={shape === 'авиаторы' ? c.chosenBlock : c.block}
                onClick={() => chooseShape('авиаторы')} >
                <img alt='shape' src={aviatorsShape} />
                авиаторы
            </div>

            <div className={shape === 'прямоугольные' ? c.chosenBlock : c.block}
                onClick={() => chooseShape('прямоугольные')} >
                <img alt='shape' src={rectangleShape} />
                прямоугольные
            </div>

            <div className={shape === 'надбровные' ? c.chosenBlock : c.block}
                onClick={() => chooseShape('надбровные')} >
                <img alt='shape' src={eyebrowShape} />
                надбровные
            </div>

            <div className={shape === 'квадратные' ? c.chosenBlock : c.block}
                onClick={() => chooseShape('квадратные')} >
                <img alt='shape' src={squareShape} />
                квадратные
            </div>

        </div>

        <div className={c.sortWrap}>
            <SortBoard />
        </div>


    </div>
}