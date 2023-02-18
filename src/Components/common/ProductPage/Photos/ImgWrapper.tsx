import { FC } from 'react';
import { API_URL } from '../../../../redux/API/api';

interface IImgWrapperProps {
    isActive: boolean
    leftTrue: string
    leftFalse: string
    url: string
}

export const ImgWrapper:FC = ({ isActive, leftTrue, leftFalse, url}:IImgWrapperProps) => {

    if (!url) { return null }    

    return <div style={isActive ? { left: leftTrue } : { left: leftFalse }}>
                    <img alt='' src={`${API_URL}${url}`} />
                </div>
}