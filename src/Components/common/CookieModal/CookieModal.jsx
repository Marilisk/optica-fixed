import c from './CookieModal.module.scss';
import { useState } from 'react';


export const CookieModal = () => {

    const [cookiesAccepted, setCookieAccept] = useState(false);

    return <>
        <div className={cookiesAccepted ? c.none : c.wrapper} >
            <div>
                <div className={c.notification}>
                    Мы используем cookie. Это позволяет нам анализировать взаимодействие посетителей с сайтом и делать его лучше. Продолжая пользоваться сайтом «Optis», вы соглашаетесь с использованием файлов cookie.
                </div>

                <div className={c.btnsWrapper}>
                    <button type='button' className={c.yesBtn}
                        onClick={() => setCookieAccept(true)}>
                        Принять
                    </button>
                </div>

            </div>
        </div>
    </>
}