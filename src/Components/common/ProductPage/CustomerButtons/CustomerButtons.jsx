import c from './CustomerButtons.module.scss';
import { Heart } from '../../../../assets/icons/Heart';


export const CustomerButtons = ({ addToFavorites, removeFromFavorites, authIsLoading, isFavorite, productId, prodLoadingStatus, addToCart }) => {

    //console.log('prodLoadingStatus', prodLoadingStatus)

    return <div className={c.btnWrap} >

        {isFavorite ?
            <button type='button' className={c.oppositeFavBtn}
                disabled={authIsLoading === 'loading' && prodLoadingStatus === 'loading'}
                onClick={() => removeFromFavorites(productId)}>
                <span className={c.hoverOnly}>удалить</span>
                <span className={c.iconWrapper}>
                    <svg fill={'#95009C'} width='18px' height='18px'
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Isolation_Mode" data-name="Isolation Mode">
                        <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                    </svg>
                </span>
            </button>
            :
            <button type='button' className={c.favBtn}
                disabled={authIsLoading === 'loading' && prodLoadingStatus === 'loading'}
                onClick={() => addToFavorites(productId)} >
                <span>в избранное</span>
                <span>
                    <Heart size={'16px'} color={'#95009C'} />
                </span>
            </button>
        }

        <button type='button' className={c.addBtn}
            disabled={authIsLoading === 'loading' || prodLoadingStatus === 'loading'}
            onClick={() => addToCart()}>
            в корзину
        </button>
    </div>


}