import c from './LeftCol.module.scss';
import { NavLink } from 'react-router-dom';
//import { setCurrentProd } from '../../../redux/productsSlice';
import { FC } from 'react';
//import { useAppDispatch } from '../../../redux/hooks';

interface ILeftCol {
    productId: string,
    imageUrlMain: string /* | null */
}

export const LeftCol: FC<ILeftCol> = ({ productId, imageUrlMain  }: ILeftCol,) => {
    //const dispatch = useAppDispatch();
    

    return <div className={c.wrap} /* onClick={() => dispatch(setCurrentProd(productId))} */ >
            <div>
                <NavLink to={`/product/${productId}`}>
                    <img src={`https://backend-optics-production.up.railway.app${imageUrlMain}`} alt='' />
                </NavLink>
            </div>
        </div>

  
}