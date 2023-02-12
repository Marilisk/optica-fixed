import { FC, useState } from 'react';
import c from './FaceShapeChoose.module.scss';
import round from './../../../assets/mainPage/faceShapes/round.png'
import rectangle from './../../../assets/mainPage/faceShapes/rectangle.png'
import oval from './../../../assets/mainPage/faceShapes/oval.png'
import square from './../../../assets/mainPage/faceShapes/square.png'
import diamond from './../../../assets/mainPage/faceShapes/diamond.png'
import heart from './../../../assets/mainPage/faceShapes/heart.png'
import oblong from './../../../assets/mainPage/faceShapes/oblong.png'
import triangle from './../../../assets/mainPage/faceShapes/triangle.png'
import { SortBoard } from '../../common/FiltersDashboard/SortBoard/SortBoard';
import { AngleIcon } from '../../../assets/icons/AngleIcon';

interface IFaceShapeChooseProps {
    shape: string
    chooseShape: (arg: string) => void
    amount: number
}

export const FaceShapeChoose: FC<IFaceShapeChooseProps> = ({ amount, shape, chooseShape }: IFaceShapeChooseProps) => {

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
                    className={shape === 'для круглого лица' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для круглого лица')} >
                    <img alt='shape' src={round} />
                    круглое
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={shape === 'для прямоугольного лица' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для прямоугольного лица')} >
                    <img alt='shape' src={rectangle} />
                    прямоугольное
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={shape === 'для овального лица' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для овального лица')} >
                    <img alt='shape' src={oval} />
                    овальное
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={shape === 'для лица в форме алмаза' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для лица в форме алмаза')} >
                    <img alt='shape' src={diamond} />
                    алмаз
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={shape === 'для квадратного лица' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для квадратного лица')} >
                    <img alt='shape' src={square} />
                    квадратное
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={shape === 'для лица в форме сердца' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для лица в форме сердца')} >
                    <img alt='shape' src={heart} />
                    сердце
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={shape === 'для вытянутого лица' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для вытянутого лица')} >
                    <img alt='shape' src={oblong} />
                    вытянутое
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={shape === 'для треугольного лица' ? c.chosenBlock : c.block}
                    onClick={() => chooseShape('для треугольного лица')} >
                    <img alt='shape' src={triangle} />
                    треугольное
                </div>


            </div>

            <div className={c.angleWrapper}>
                <AngleIcon color={'#666666'} size={'20px'} margin={'0'} transform={'none'}
                    showAnother={() => setAnotherPortion(portion + 1)}
                    disabled={portion > 3} />
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