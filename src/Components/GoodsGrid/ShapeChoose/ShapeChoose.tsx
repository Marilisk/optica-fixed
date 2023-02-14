import { FC, useState } from 'react';
import c from './ShapeChoose.module.scss';
import roundShape from './../../../assets/mainPage/roundShape.png'
import cateyeShape from './../../../assets/mainPage/cateyeShape.png'
import aviatorsShape from './../../../assets/mainPage/aviatorsShape.png'
import rectangleShape from './../../../assets/mainPage/rectangleShape.png'
import eyebrowShape from './../../../assets/mainPage/eyebrowShape.png'
import squareShape from './../../../assets/mainPage/squareShape.png'
import { SortBoard } from '../../common/FiltersDashboard/SortBoard/SortBoard';
import { AngleIcon } from '../../../assets/icons/AngleIcon';

interface IShapeChooseProps {
    shape: string
    chooseShape: (arg: string) => void
    amount: number
}

export const ShapeChoose: FC<IShapeChooseProps> = ({ shape, chooseShape, amount }: IShapeChooseProps) => {

    const [portion, setAnotherPortion] = useState(1)

    return <div className={c.wrapper}>

        <div className={c.adaptiveFlex}>

            <div className={c.angleWrapper}>
                <AngleIcon color={'#666666'} size={'20px'} margin={'0'} transform={'rotate(180deg)'}
                    showAnother={() => setAnotherPortion(portion - 1)}
                    disabled={portion < 1} />
            </div>

            <div className={c.shapeChoseWrap}>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                className={shape === 'круглые' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('круглые')} >
                    <img alt='shape' src={roundShape} />
                    круглые
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                className={shape === 'cat eye' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('cat eye')} >
                    <img alt='shape' src={cateyeShape} />
                    кошачий глаз
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                className={shape === 'авиаторы' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('авиаторы')} >
                    <img alt='shape' src={aviatorsShape} />
                    авиаторы
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                className={shape === 'прямоугольные' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('прямоугольные')} >
                    <img alt='shape' src={rectangleShape} />
                    прямоугольные
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                className={shape === 'надбровные' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('надбровные')} >
                    <img alt='shape' src={eyebrowShape} />
                    надбровные
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                className={shape === 'квадратные' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('квадратные')} >
                    <img alt='shape' src={squareShape} />
                    квадратные
                </div>

            </div>

            <div className={c.angleWrapper}>
                <AngleIcon color={'#666666'} size={'20px'} margin={'0'} transform={'none'}
                    showAnother={() => setAnotherPortion(portion + 1)}
                    disabled={portion > 2} />
            </div>
        </div>

        <div className={c.sortWrap}>
            <p className={c.amount}>
                {amount} вариантов
            </p>
            <SortBoard />
        </div>


    </div>
}