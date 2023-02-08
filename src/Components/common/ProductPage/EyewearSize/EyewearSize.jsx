import { useState } from 'react';
import c from './EyewearSize.module.scss';
import ruler from './ruler.svg';
import frame from './frame.png';

export const EyewearSize = ({ size }) => {
    
    const [modalOpened, changeModalOpened] = useState(false);

    return <div className={c.flex}>
        <div className={c.size}>
            {size}
        </div>
        <div className={c.sizeChart} onClick={() => changeModalOpened(!modalOpened)}>
            <img alt='' src={ruler} />
            ширина оправы

        </div>

        <div style={!modalOpened ? { display: 'none', pointerEvents: 'none' } : { display: 'block' }}
            className={c.darkBack}
            onClick={() => changeModalOpened(!modalOpened)} >

        </div>

        <div style={!modalOpened ? { display: 'none' } : { display: 'block' }} className={c.table}>
            <div className={c.modalHead}>Ширина оправ:</div>
            <div className={c.flexWrap}>
                <div>
                    <img alt='' src={frame} />
                </div>

                <div>
                    <p><span>детские:</span> до 127 мм.</p>
                    <p><span>маленькие:</span> до 134 мм.</p>
                    <p><span>средние:</span> до 139 мм.</p>
                    <p><span>большие:</span> от 140 мм.</p>
                </div>
            </div>
        </div>
    </div>



}