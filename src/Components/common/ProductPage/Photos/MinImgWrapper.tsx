import { FC } from 'react';
import { API_URL } from '../../../../redux/API/api';

interface IMinImgWrapperProps {
    onClickHandler: () => void
    url: string
    isActive: boolean
}

export const MinImgWrapper:FC = ({ onClickHandler, url, isActive }:IMinImgWrapperProps) => {

    if (!url) { return null}

    return <div onClick={() => onClickHandler()} >
                <img alt='' src={`${API_URL}${url}`}
                    style={isActive ? { borderColor: '#C899CC' } : null} />
            </div>
}