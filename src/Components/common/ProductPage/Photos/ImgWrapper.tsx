import c from './Photos.module.scss';
import { FC, useState } from 'react';
import { Preloader } from '../../../../assets/common/Preloader/Preloader';

interface IImgWrapperProps {
    isActive: boolean
    leftTrue: string
    leftFalse: string
    url: string
}

export const ImgWrapper:FC = ({ isActive, leftTrue, leftFalse, url}:IImgWrapperProps) => {

    

    if (!url) { return null }
    

    return <div style={isActive ? { left: leftTrue } : { left: leftFalse }}>
                    <img alt='' src={`https://backend-optics-without-packlo.onrender.com${url}`} />
                </div>

        


}