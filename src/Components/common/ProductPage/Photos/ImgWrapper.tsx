import { FC } from 'react';

interface IImgWrapperProps {
    isActive: boolean
    leftTrue: string
    leftFalse: string
    url: string
}

export const ImgWrapper:FC = ({ isActive, leftTrue, leftFalse, url}:IImgWrapperProps) => {

    if (!url) { return null }    

    return <div style={isActive ? { left: leftTrue } : { left: leftFalse }}>
                    <img alt='' src={`https://backend-optics-production.up.railway.app${url}`} />
                </div>
}