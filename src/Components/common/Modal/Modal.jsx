import c from './Modal.module.scss';
import { Link } from 'react-router-dom';

export const Modal = ({ switchModal }) => {

    return <>
        <div className={c.wrapper}
            onClick={() => switchModal(false)}>
            <div>
                <div className={c.notification}>
                    Войдите, чтобы добавлять товары
                </div>

                <div className={c.btnsWrapper}>

                    <button type='button' className={c.yesBtn}>
                        <Link to='/login' >Войти</Link>
                    </button>

                    <button type='button'
                        className={c.cancelBtn}
                        onClick={() => switchModal(false)}>
                        не хочу
                    </button>
                </div>

            </div>
        </div>

    </>
}