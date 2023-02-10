import { FC } from 'react';

interface IMinImgWrapperProps {
    onClickHandler: () => void
    url: string
    isActive: boolean
}

export const MinImgWrapper:FC = ({ onClickHandler, url, isActive }:IMinImgWrapperProps) => {

    if (!url) { return null}

    return <div onClick={() => onClickHandler()} >
                <img alt='' src={`https://backend-optics-without-packlo.onrender.com${url}`}
                    style={isActive ? { borderColor: '#C899CC' } : null} />
            </div>
}