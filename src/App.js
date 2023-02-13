import { Header } from './Components/Header/Header.jsx';
import { Footer } from './Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuth, fetchAddToFavorites, fetchRemoveFromFavorites, selectIsAuth, selectIsManager } from './redux/authSlice';
import { fetchProducts } from './redux/productsSlice';
import { Modal } from './Components/common/Modal/Modal';
import { setfullHeaderTheme } from './redux/headerSlice';
import { fetchFilterOptions } from './redux/featuresSlice';
import { Preloader } from './assets/common/Preloader/Preloader.jsx';
import { CookieModal } from './Components/common/CookieModal/CookieModal.jsx';
import { Outlet } from 'react-router-dom';


export const App = () => {
  const dispatch = useDispatch();
  const authOfferModalOn = useSelector(s => s.header.authOfferModalOpened)
  const isManager = useSelector(selectIsManager);
  const isAuth = useSelector(selectIsAuth);
  const fullHeader = useSelector(state => state.header.fullHeader);


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

  const userFavorites = useSelector(state => state.auth.loginData.data?.favourites);
  let favoritesCount = userFavorites ? userFavorites.length : null;
  const authIsLoading = useSelector(state => state.auth.loginData.status);


  if (localStorage.getItem('token') && !isAuth) {
    return <Preloader minFormat={false} />;
  }

  return <>
    {/* {authOfferModalOn ? <Modal /> : null} */}
    <Modal />

    <Header fullHeader={fullHeader} favoritesCount={favoritesCount} />

    <div>
      <Outlet />
    </div>

    <Footer />

    <CookieModal />

  </>;
}



