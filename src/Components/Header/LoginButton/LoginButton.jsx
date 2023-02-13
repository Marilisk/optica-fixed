import c from './LoginButton.module.scss';
import user from './../../../assets/header/icons/user.svg';
import { LoginForm } from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchLogout, selectIsAuth } from '../../../redux/authSlice';
import { Cross } from '../../../assets/icons/Cross.jsx';


export const LoginButton = ({ toggleLoginModalOpened, loginModalOpened, dispatch }) => {

    const isAuth = useSelector(selectIsAuth);
    const isLoading = useSelector(s => s.auth.loginData.status);

    return <div>
        <div className={c.menuItem}
            onClick={!isAuth ? () => toggleLoginModalOpened(!loginModalOpened) : () => {
                let confirm = window.confirm('Уверены, что хотите выйти?');
                if (confirm) {
                    dispatch(fetchLogout());
                }
            }}
            style={loginModalOpened ? { background: '#FAFAFA' } : null}>
            <img alt='' src={user} />
            {isAuth ? <p>Выйти</p> : <p>Войти</p>}
        </div>

        {loginModalOpened &&
            <div className={loginModalOpened ? c.modal : c.hiddenModal} >

                <div className={c.h2Wrapper}>
                    <h2>Авторизуйтесь:</h2>

                    <div onClick={() => toggleLoginModalOpened()}>
                        <Cross size={25} color={'#95009C'} margin={0} transform={'none'} />
                    </div>
                </div>


                <LoginForm toggleLoginModalOpened={toggleLoginModalOpened}
                    dispatch={dispatch}
                    isLoading={isLoading} />

                <div className={c.signUpOffer} onClick={() => toggleLoginModalOpened(false)}>
                    Впервые у нас? Зарегистрируйтесь!
                    <Link to='login'>
                        Создать аккаунт
                    </Link>

                </div>
            </div>}
        {/* <div className={loginModalOpened ? c.modal : c.hiddenModal} >

            <div className={c.h2Wrapper}>
                <h2>Авторизуйтесь:</h2>
                
                <div onClick={() => toggleLoginModalOpened()}>
                    <Cross size={25} color={'#95009C'} margin={0} transform={'none'} />
                </div>
            </div>


            <LoginForm toggleLoginModalOpened={toggleLoginModalOpened} 
                        dispatch={dispatch} 
                        isLoading={isLoading} />
                        
            <div className={c.signUpOffer} onClick={() => toggleLoginModalOpened(false)}>
                Впервые у нас? Зарегистрируйтесь!
                <Link to='login'>
                    Создать аккаунт
                </Link>

            </div>
        </div> */}

    </div>

}