import c from './Photos.module.scss';
import { useState } from 'react';
import { ImgWrapper } from './ImgWrapper';
import { MinImgWrapper } from './MinImgWrapper';
import { LoadingDots } from '../../../../assets/common/Preloader/LoadingDots/LoadingDots';


export const Photos = ({ imageUrl }) => {

    const [image, setImage] = useState('main');

    /* if (!imageUrl) { return <LoadingDots /> } */

    return <div className={c.leftPart}>

        <div className={c.miniPhotos}>

            <MinImgWrapper onClickHandler={() => setImage('main')} url={imageUrl.main} isActive={image === 'main'} />

            <MinImgWrapper onClickHandler={() => setImage('side')} url={imageUrl.side} isActive={image === 'side'} />

            <MinImgWrapper onClickHandler={() => setImage('perspective')} url={imageUrl.perspective} isActive={image === 'perspective'} />

        </div>


        <div className={c.carausel}>

            <ImgWrapper isActive={image === 'main'} leftTrue={'40px'} leftFalse={'-100vw'} url={imageUrl.main} />

            <ImgWrapper isActive={image === 'side'} leftTrue={'40px'} leftFalse={'100vw'} url={imageUrl.side} />

            <ImgWrapper isActive={image === 'perspective'} leftTrue={'40px'} leftFalse={'100vw'} url={imageUrl.perspective} />

        </div>

    </div>


}