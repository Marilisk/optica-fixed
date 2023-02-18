import c from './LeftLensCol.module.scss';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import { API_URL } from '../../../../redux/API/api';

interface ILeftLensCol {
    productId: string,
    imageUrlMain: string /* | null */
}

export const LeftLensCol: FC<ILeftLensCol> = ({ productId, imageUrlMain  }: ILeftLensCol,) => {
    

    return <div className={c.wrap} >
            <div>
                <NavLink to={`/product/${productId}`}>
                    <img src={`${API_URL}${imageUrlMain}`} alt='' />
                </NavLink>
            </div>
        </div>

  
}