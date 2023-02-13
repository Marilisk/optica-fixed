import c from './Modal.module.scss';
import { Link } from 'react-router-dom';
import { switchAuthOfferModal } from '../../../redux/headerSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

export const Modal = () => {

    const dispatch = useAppDispatch();
    const authOfferModalOn = useAppSelector (s => s.header.authOfferModalOpened)

    if (!authOfferModalOn) {
        return null
    }

    return <>
        <div className={c.wrapper}
            onClick={() => dispatch(switchAuthOfferModal(false)) } >
            <div>
                <div className={c.notification}>
                    Войдите, чтобы добавлять товары
                </div>

                <div className={c.btnsWrapper}>

                    <button type='button' className={c.yesBtn}>
                        <Link to='/login'>
                            Войти
                        </Link>
                    </button>

                    <button type='button'
                        className={c.cancelBtn}
                        onClick={() => dispatch(switchAuthOfferModal(false)) } >
                        не хочу
                    </button>
                </div>

            </div>
        </div>

    </>
}