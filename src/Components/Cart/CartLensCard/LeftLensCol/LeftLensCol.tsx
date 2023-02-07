import c from './LeftLensCol.module.scss';
import { NavLink } from 'react-router-dom';
//import { setCurrentProd } from '../../../redux/productsSlice';
import { FC } from 'react';
//import { useAppDispatch } from '../../../redux/hooks';

interface ILeftLensCol {
    productId: string,
    imageUrlMain: string /* | null */
}

export const LeftLensCol: FC<ILeftLensCol> = ({ productId, imageUrlMain  }: ILeftLensCol,) => {
    //const dispatch = useAppDispatch();
    

    return <div className={c.wrap} /* onClick={() => dispatch(setCurrentProd(productId))} */ >
            <div>
                <NavLink to={`/product/${productId}`}>
                    <img src={`http://localhost:4444${imageUrlMain}`} alt='' />
                </NavLink>
            </div>
        </div>

  
}