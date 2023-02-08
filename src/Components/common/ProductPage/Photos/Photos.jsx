import c from './Photos.module.scss';
import { useState } from 'react';
import { Preloader } from '../../../../assets/common/Preloader/Preloader';


export const Photos = ({ imageUrl }) => {

    const [image, setImage] = useState('main');

    // if (!imageUrl) { return <Preloader minFormat={true} /> }

    return <div className={c.leftPart}>

        <div className={c.miniPhotos}>

            <div onClick={() => setImage('main')} >
                <img alt='' src={`https://backend-optics-without-packlo.onrender.com${imageUrl.main}`}
                    style={image === 'main' ? { borderColor: '#57005C' } : null} />
            </div>

            {Boolean(imageUrl.side) &&
                <div onClick={() => setImage('side')} >
                    <img alt='' src={`https://backend-optics-without-packlo.onrender.com${imageUrl.side}`}
                        style={image === 'side' ? { borderColor: '#57005C' } : null} />
                </div>
            }

            {Boolean(imageUrl.perspective) &&
                <div onClick={() => setImage('perspective')} >
                    <img alt='' src={`https://backend-optics-without-packlo.onrender.com${imageUrl.perspective}`}
                        style={image === 'perspective' ? { borderColor: '#57005C' } : null} />
                </div>
            }

        </div>


        <div className={c.carausel}>
            <div style={image === 'main' ? { left: '40px' } : { left: '-100vw' }} >
                <img alt='' src={`https://backend-optics-without-packlo.onrender.com${imageUrl.main}`} />
            </div>

            {Boolean(imageUrl.side) &&
                <div style={image === 'side' ? { left: '40px' } : { left: '100vw' }}>
                    <img alt='' src={`https://backend-optics-without-packlo.onrender.com${imageUrl.side}`} />
                </div>
            }
            {Boolean(imageUrl.perspective) &&
                <div style={image === 'perspective' ? { left: '40px' } : { left: '100vw' }}>
                    <img alt='' src={`https://backend-optics-without-packlo.onrender.com${imageUrl.perspective}`} />
                </div>
            }
        </div>

    </div>


}