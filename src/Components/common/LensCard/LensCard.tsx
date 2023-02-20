import c from './LensCard.module.scss';
import { NavLink } from 'react-router-dom';
import { priceFormatter } from '../../../assets/functions/priceFormatter';
import { FC, useState } from 'react';
import { ILensProduct } from '../../Types/types';
import { useAppDispatch } from '../../../redux/hooks';
import { setCurrentProd } from '../../../redux/lensesSlice';
import { API_URL } from '../../../redux/API/api';


interface ILensCardProps {
    product: ILensProduct
    inCartArray: Array<string>
}
export const LensCard: FC<ILensCardProps> = ({ product, inCartArray }: ILensCardProps) => {
    const dispatch = useAppDispatch()
    const price = priceFormatter(product.price)
    const isInCart = inCartArray.includes(product._id)

    const [isHovered, setIsHovered] = useState(null)

    return <div className={c.wrap}
        onClick={() => dispatch(setCurrentProd(product))}
        onMouseOver={() => setIsHovered(product._id)}
        onMouseLeave={() => setIsHovered(null)} >

        <NavLink to={`/lenses/${product._id}`}>
            <img src={`${API_URL}${product.imageUrl.main}`} alt='' />
            <div className={c.price}>
                {price}
            </div>
        </NavLink>

        {isHovered === product._id &&
            <div className={c.addToCart}>

                {isInCart && <div>в корзине</div>}

            </div>
        }
    </div>
}