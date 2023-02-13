import { useState, useEffect } from 'react';
import { switchAuthOfferModal } from '../headerSlice';
import { fetchAddToFavorites, selectIsAuth } from './../authSlice';
import { useAppSelector, useAppDispatch } from './../hooks';

export const addToFavoritesWithControl = (isAuth, dispatchModal, fetch) => {  

    if (!isAuth) {
        
        return dispatchModal()
    } else {
        return fetch()
    }
}



