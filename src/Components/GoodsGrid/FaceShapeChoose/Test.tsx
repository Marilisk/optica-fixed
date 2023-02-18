import { FC, useState } from 'react';
import c from './test.module.scss';
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
    
}

export const Test: FC<IFaceShapeChooseProps> = ({  }: IFaceShapeChooseProps) => {

    const avatarList = [round, rectangle, oval, 
        diamond,square, heart, triangle ]

    return <div className={c.wrapper}
        /* style={ avatarList.length > 3 ? 
            {gridTemplateColumns: 'repeat(2, 1fr)'}
            : 
            {gridTemplateColumns: 'repeat(3, 1fr)' }} */ >
        
        {avatarList.map((img, i) => {
            return <img key={i} src={img} alt='' />
        } )}
    </div>
}