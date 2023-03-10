import c from './LoginPage.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setfullHeaderTheme } from '../../../redux/headerSlice';
import { selectIsAuth } from '../../../redux/authSlice';
import { useState } from 'react';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { useNavigate } from 'react-router-dom';


export const LoginPage = ({isLoading}) => {
    const isAuth = useSelector(selectIsAuth);
    const [isLoginTab, setIsLoginTab] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setfullHeaderTheme(false))
    }, [dispatch])

    let navigate  = useNavigate();
   
    const toggleLoginModalOpened = () => {
        dispatch(setfullHeaderTheme(true));
        navigate(-1);
    }
    if (isAuth) {
        navigate(-1);   // проверить надо
    }

   
    return <div className={c.wrap}>
        <div className={c.tabWrap}>
            <div className={isLoginTab ? c.activeTab : c.tab} onClick={()=> setIsLoginTab(true)}>
                ВОЙТИ
            </div>
            <div className={isLoginTab ? c.tab : c.activeTab} onClick={()=> setIsLoginTab(false)}>
                ЗАРЕГИСТРИРОВАТЬСЯ
            </div>
        </div>

        {isLoginTab ?  <LoginForm dispatch={dispatch} 
                                  toggleLoginModalOpened={toggleLoginModalOpened}
                                  isLoading={isLoading} /> :

             <RegisterForm dispatch={dispatch} 
                    toggleLoginModalOpened={toggleLoginModalOpened} 
                    navigate={navigate}
                    isLoading={isLoading} /> }
               
    </div>

}