import { createAppAsyncThunk } from './hooks';
import { RootState } from './redux-store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ICartItem, ILData, ISubscribeData, IUser } from "../Components/Types/types";
import instance, { API_URL } from "./API/api";


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    let response = await instance.post('/auth/login', params);
    console.log(response);
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
})

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
    let response = await instance.post('/auth/logout');
    //console.log(response)
    return response.data;
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    try {
        const response = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true });
        //console.log('refresh response tokens ', response.data.tokens.accessToken)
        localStorage.setItem('token', response.data.tokens.accessToken);
        console.log(response.data.user)
        return response.data.user;
    } catch (error) {
        console.log(error)
    }
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    let response = await instance.post('/auth/register', params);
    console.log(response);
    localStorage.setItem('token', response.data.accessToken)
    return response.data.user;
})

export const fetchAddToFavorites = createAsyncThunk('auth/fetchAddToFavorites', async (productId) => {
    const response = await instance.post(`/addtofav`, { productId });
    //console.log(response);
    return response.data;
})
export const fetchRemoveFromFavorites = createAsyncThunk('auth/fetchRemoveFromFavorites', async (productId) => {
    const response = await instance.post(`/removefav`, { productId });
    //console.log(response);
    return response.data;
});

export const fetchAddEyewearToCart = createAsyncThunk('auth/fetchAddEyewearToCart', async (productId: string) => {
    console.log(productId)
    const response = await instance.post(`/addtocart`, { productId });
    console.log(response);
    return response.data;
})
export const fetchRemoveEyewearFromCart = createAsyncThunk('auth/fetchRemoveEyewearFromCart', async (productId: string) => {
    const response = await instance.post(`/removefav`, { productId });
    console.log(response);
    return response.data;
});



export const fetchUpdateCart = createAppAsyncThunk('auth/fetchUpdateCart', async (_, thunkApi) => {
    const state = thunkApi.getState();
    const queryCart = state.auth.loginData.data?.cart;
    //console.log('fetchUpdateCart cart ', queryCart)
    const response = await instance.post(`/editcart`, queryCart);
    //console.log(response);
    return response;
});


export type AuthInitStateType = {
    loginData?: ILData 
    subscribeData: ISubscribeData
}

const initialState: AuthInitStateType = {
    loginData: {
        data: /* {
            activationLink: '',
            _id: '',
            cart: [],
            createdAt: '',
            email: '',
            favourites: [],
            fullName: '',
            isActivated: false,
            password: '',
            role: '',
            updatedAt: '',
            __v: 0,
        } */ null,
        status: 'loaded',
    },
    subscribeData: {
        email: '',
        responseMsg: '',
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        subscribe(state, action) {
            //there must be an async func which checks email in base and if its not yet:
            state.subscribeData.responseMsg = 'Ваш промокод на скидку 8% направлен на e-mail. Спасибо.'
        },
        updateCart(state, action/* : PayloadAction<number> */) {
            if (state.loginData.data != null) {
            state.loginData.data.cart[action.payload.cartItemIndex] = action.payload.newCartItem;
             }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.loginData.status = 'loading';
            //state.loginData.data = null;
        })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loginData.status = 'loaded';
                state.loginData.data = action.payload.user;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.loginData.status = 'loaded';
            })

            .addCase(fetchLogout.pending, (state) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.loginData.status = 'loaded';
                state.loginData.data = null;
            })
            .addCase(fetchLogout.rejected, (state) => {
                state.loginData.status = 'error';
            })

            .addCase(checkAuth.pending, (state) => {
                state.loginData.status = 'loading';
                state.loginData.data = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loginData.status = 'loaded';
                state.loginData.data = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loginData.status = 'error';
                state.loginData.data = null;
            })

            .addCase(fetchRegister.pending, (state) => {
                state.loginData.status = 'loading';
                state.loginData.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loginData.status = 'loaded';
                state.loginData.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.loginData.status = 'error';
                state.loginData.data = null;
            })

            .addCase(fetchAddToFavorites.pending, (state, action) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchAddToFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
                //console.log(action.payload)
                if (state.loginData.data != null) {
                    state.loginData.data.favourites = action.payload;
                    state.loginData.status = 'loaded';
                }
            })
            .addCase(fetchAddToFavorites.rejected, (state, action) => {
                state.loginData.status = 'error';
            })


            .addCase(fetchRemoveFromFavorites.pending, (state, action) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchRemoveFromFavorites.fulfilled, (state, action) => {
                //console.log(action.payload)
                if (state.loginData.data != null) {
                    state.loginData.data.favourites = action.payload;
                    state.loginData.status = 'loaded';
                }
                /* state.loginData.data?.favourites = action.payload;
                state.loginData.status = 'loaded'; */

            })
            .addCase(fetchRemoveFromFavorites.rejected, (state, action) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchAddEyewearToCart.pending, (state, action) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchAddEyewearToCart.fulfilled, (state, action) => {
                if (state.loginData.data != null) {
                    state.loginData.data.cart = action.payload;
                    state.loginData.status = 'loaded';
                }
            })
            .addCase(fetchAddEyewearToCart.rejected, (state, action) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchRemoveEyewearFromCart.pending, (state, action) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchRemoveEyewearFromCart.fulfilled, (state, action) => {
                if (state.loginData.data != null) {
                    state.loginData.data.cart = action.payload;
                    state.loginData.status = 'loaded';
                }
            })
            .addCase(fetchRemoveEyewearFromCart.rejected, (state, action) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchUpdateCart.pending, (state, action) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchUpdateCart.fulfilled, (state, action) => {
                console.log(action)
                //state.loginData.data.cart = action.payload;
                state.loginData.status = 'loaded';
            })
            .addCase(fetchUpdateCart.rejected, (state, action) => {
                state.loginData.status = 'error';
            })




    },

});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.loginData.data);
export const selectIsManager = (state: RootState) => Boolean(state.auth.loginData.data?.role === 'ADMIN');



export const { subscribe, updateCart } = authSlice.actions;
export default authSlice.reducer;