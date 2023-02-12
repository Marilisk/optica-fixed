import { FC, useState } from 'react';
import c from './ColorChoose.module.scss';
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

interface IColorChooseProps {
    color: string
    chooseColor: (arg: string) => void
    amount: number
}

export const ColorChoose: FC<IColorChooseProps> = ({ amount, color , chooseColor }: IColorChooseProps) => {

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
                    className={color === 'чёрный' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('для круглого лица')} >
                    <div className={c.colorPad} style={{background: '#000000' }}/>
                    чёрный
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={color === 'золото' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('золото')} >
                    <div className={c.colorPad} style={{background: '#DDB92C' }}/>
                    золото
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={color === 'прозрачный' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('прозрачный')} >
                    <div className={c.colorPad} style={{background: '#ffffff', borderColor: '#666666' }}/>
                    прозрачные
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={color === 'серебро' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('серебро')} >
                    <div className={c.colorPad} style={{background: '#C7C7C7' }}/>
                    серебро
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={color === 'синий' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('синий')} >
                    <div className={c.colorPad} style={{background: '#092CAA' }}/>
                    синий
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={color === 'белый' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('белый')} >
                    <div className={c.colorPad} style={{background: '#ffffff', borderColor: '#666666' }}/>
                    белый
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={color === 'коричневый' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('коричневый')} >
                    <div className={c.colorPad} style={{background: '#765D4B' }}/>
                    коричневый
                </div>

                <div style={{ transform: `translateX(-${portion * 100}%)` }}
                    className={color === 'розовый' ? c.chosenBlock : c.block}
                    onClick={() => chooseColor('розовый')} >
                    <div className={c.colorPad} style={{background: '#D18D97' }}/>
                    розовый
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