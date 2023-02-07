import c from './LensCard.module.scss';
import { Heart } from '../../../assets/icons/Heart'
import { NavLink } from 'react-router-dom';
import { priceFormatter } from '../../../assets/functions/priceFormatter';
import { FC, useState } from 'react';
import { ILensProduct, LoadingStatusEnum } from '../../Types/types';
import { useAppDispatch } from '../../../redux/hooks';
import { setCurrentProd } from '../../../redux/lensesSlice';


interface ILensCardProps {
    product: ILensProduct
    addToFavorites: (arg: string) => void
    removeFromFavorites: (arg: string) => void
    userFavorites: string[]
    authIsLoading: LoadingStatusEnum
    inCartArray: Array<string>
}
export const LensCard:FC = ({ product, addToFavorites, removeFromFavorites, userFavorites, authIsLoading, inCartArray }:ILensCardProps) => {
    const dispatch = useAppDispatch()
    const price = priceFormatter(product.price)
    const isFavorite = userFavorites?.includes(product._id)
    const isInCart = inCartArray.includes(product._id)

    const [isHovered, setIsHovered] = useState(null)
    

    return <div className={c.wrap} 
                onClick={() => dispatch(setCurrentProd(product))}
                onMouseOver={() => setIsHovered(product._id)}
                onMouseLeave={() => setIsHovered(null)} >
        
        <NavLink to={`/lenses/${product._id}`}>
            <img src={`http://localhost:4444${product.imageUrl.main}`} alt='' />
            <div className={c.price}>
                {price}
            </div>
        </NavLink>

        <div className={c.like}>
            
        {isFavorite ?
                <div onClick={() => removeFromFavorites(product._id)} >
                    <svg fill={'#95009C'} width='18px' height='18px'
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Isolation_Mode" data-name="Isolation Mode">
                        <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                    </svg>
                </div>
                :
                <div onClick={() => addToFavorites(product._id)} >
                    <Heart color={'#C899CC'} size={'18px'} margin={'0px'} transform={'none'} />
                </div>
            }

        </div>


        {isHovered === product._id &&
        <div className={c.addToCart}>
            
            {isInCart && <div>в корзине</div> }

        </div>
          }
    </div>
}