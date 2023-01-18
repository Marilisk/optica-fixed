import c from './ProductCard.module.scss';
import defaultGlasses from './../../../assets/common/defaultGlasses.webp';
import { Heart } from './../../../assets/icons/Heart.jsx';
import { NavLink } from 'react-router-dom';
import { setCurrentProd } from '../../../redux/productsSlice';
//import { Preloader } from '../../../assets/common/Preloader/Preloader';


export const ProductCard = ({ dispatch, product, addToFavorites, removeFromFavorites, userFavorites, authIsLoading }) => {

    const price = product.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });

    const isFavorite = userFavorites?.includes(product._id);


    return <div className={c.wrap} onClick={() => dispatch(setCurrentProd(product))} >
        {/* <NavLink to={`/product/${product._id}`}> */}
        <NavLink to={`/product/${product._id}`}>
            <img src={product.imageUrl?.main ? `http://localhost:4444${product.imageUrl.main}` : defaultGlasses} alt='' />
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
                    <Heart color={'#C899CC'} size={'18px'} />
                </div>
            }

        </div>
    </div>
}