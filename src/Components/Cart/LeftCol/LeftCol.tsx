import c from './LeftCol.module.scss';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import { API_URL } from '../../../redux/API/api';

interface ILeftCol {
    productId: string,
    imageUrlMain: string /* | null */
}

export const LeftCol: FC<ILeftCol> = ({ productId, imageUrlMain  }: ILeftCol,) => {
    //const dispatch = useAppDispatch();
    

    return <div className={c.wrap} /* onClick={() => dispatch(setCurrentProd(productId))} */ >
            <div>
                <NavLink to={`/product/${productId}`}>
                    <img src={`${API_URL}${imageUrlMain}`} alt='' />
                </NavLink>
            </div>
        </div>

  
}