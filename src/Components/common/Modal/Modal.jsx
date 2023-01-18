
import c from './Modal.module.scss';
import { NavLink } from 'react-router-dom';



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
                        <NavLink to='/login' >Войти</NavLink>
                    </button>

                    <button type='button'
                        className={c.cancelBtn}
                        onClick={() => switchModal(false)}>
                        Отмена
                    </button>
                </div>

            </div>


        </div>

    </>
}