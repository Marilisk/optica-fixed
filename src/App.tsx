import { Header } from './Components/Header/Header.jsx';
import { Footer } from './Components/Footer/Footer';
import { useEffect } from 'react';
import { checkAuth, selectIsAuth } from './redux/authSlice';
import { fetchProducts } from './redux/productsSlice';
import { Modal } from './Components/common/Modal/Modal';
import { setfullHeaderTheme } from './redux/headerSlice';
import { fetchFilterOptions } from './redux/featuresSlice';
import { CookieModal } from './Components/common/CookieModal/CookieModal.jsx';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Preloader } from './assets/common/Preloader/Preloader.jsx';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { LoadingStatusEnum } from './Components/Types/types';
import { ErrorPage } from './assets/ErrorPage/ErrorPage';


export const App = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth);
  const fullHeader = useAppSelector(state => state.header.fullHeader);
  const authLoadingError = useAppSelector(s => s.auth.loginData.status === LoadingStatusEnum.error)

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(setfullHeaderTheme(true));
    dispatch(fetchFilterOptions('features'));
    dispatch(fetchFilterOptions('color'));
    dispatch(fetchFilterOptions('shape'));
    dispatch(fetchFilterOptions('material'));
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setfullHeaderTheme(true));
  }, [isAuth, dispatch]);

  const userFavorites = useAppSelector(state => state.auth.loginData.data?.favourites);
  let favoritesCount = userFavorites ? userFavorites.length : null;

  if (authLoadingError) {
    return <ErrorPage />
  }
  if (localStorage.getItem('token') && !isAuth) {
    return <Preloader minFormat={false} />;
  }

  return <>
    <Modal />
    <Header fullHeader={fullHeader} favoritesCount={favoritesCount} />
    <div>
      <Outlet />
    </div>
    <Footer />
    <CookieModal />
    <ScrollRestoration />
  </>;
}



