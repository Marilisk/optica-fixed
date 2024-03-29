import { FetchAddToCartArgType, RegisterPayload } from './../Components/Types/types';
import { createAppAsyncThunk } from './hooks';
import { RootState } from './redux-store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ILData, ISubscribeData, OrderType } from "../Components/Types/types";
import instance, { API_URL } from "./API/api";
import { IInitialValues } from '../Components/Cart/Order/Address/initialValues';
import { orderCreate } from './functions/useOrderCreator';


export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    let response = await instance.post('/auth/login', params);
    localStorage.setItem('token', response.data.accessToken)
    return response;
})

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
    let response = await instance.post('/auth/logout');
    localStorage.removeItem('token')
    return response.data;
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {  // refreshes tokens and login data    
    const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true })
    localStorage.setItem('token', response.data.tokens.accessToken)
    return response.data.user;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: RegisterPayload) => {
    let response = await instance.post('/auth/register', params)
    localStorage.setItem('token', response.data.accessToken)
    return response.data;
})

export const fetchAddToFavorites = createAsyncThunk('auth/fetchAddToFavorites', async (productId: string) => {
    const response = await instance.post(`/addtofav`, { productId });
    return response.data;
})
export const fetchRemoveFromFavorites = createAsyncThunk('auth/fetchRemoveFromFavorites', async (productId: string) => {
    const response = await instance.post(`/removefav`, { productId });
    return response.data;
});

export const fetchAddEyewearToCart = createAsyncThunk('auth/fetchAddEyewearToCart', async ({ productId, cat, lens = 1 }: FetchAddToCartArgType) => {
    const response = await instance.post(`/addtocart`, { productId, cat, lens });
    return response.data;
})
export const fetchRemoveEyewearFromCart = createAsyncThunk('auth/fetchRemoveEyewearFromCart', async (productId: string) => {
    const response = await instance.post(`/removefromcart`, { productId });
    return { cart: response.data, deletedProductId: productId };
});

export const fetchUpdateCart = createAppAsyncThunk('auth/fetchUpdateCart', async (_, thunkApi) => {
    const state = thunkApi.getState();
    const queryCart = state.auth.loginData.data?.cart;
    const response = await instance.post(`/editcart`, queryCart);
    return response.data;
});


export const fetchCreateOrder = createAppAsyncThunk('auth/fetchCreateOrder', async (addressValues: IInitialValues, thunkApi) => {
    const state = thunkApi.getState()
    const userId = state.auth.loginData.data?._id;
    const cart = state.products.currentCartWithSums.items;
    const order: OrderType = orderCreate(cart, addressValues, userId)
    const response = await instance.post(`/createorder`, order);
    return response.data;
})
export const fetchAddValuesToOrder = createAppAsyncThunk('auth/fetchAddValuesToOrder',
    async (values: IInitialValues, thunkApi) => {
        const state = thunkApi.getState()
        const prevOrder: OrderType = state.products.processedOrder.order
        const innovatedOrder: OrderType = {
            ...prevOrder,
            address: values.address,
            phoneNumber: values.phone,
            additionalInfo: values.additional,
        }
        const response = await instance.post(`/editorder`, innovatedOrder);
        return response.data;
    })
export const fetchEditOrder = createAppAsyncThunk('auth/fetchEditOrder',
    async (isCardChosen: boolean, thunkApi) => {
        const state = thunkApi.getState()
        const prevOrder: OrderType = state.products.processedOrder.order
        const thisPaymentWay = isCardChosen ? 'card' : 'cash'
        const innovatedOrder = { ...prevOrder, paymentWay: thisPaymentWay }
        const response = await instance.post(`/editorder`, innovatedOrder);
        return response.data;
    })
export const fetchConFirmOrder = createAppAsyncThunk('auth/fetchConFirmOrder',
    async (_, thunkApi) => {
        const state = thunkApi.getState()
        const prevOrder: OrderType = state.products.processedOrder.order
        const innovatedOrder = { ...prevOrder, condition: 'confirmed' }
        const response = await instance.post(`/confirmorder`, innovatedOrder);
        return response.data;
    })

export const fetchDeleteOrder = createAppAsyncThunk('auth/fetchDeleteOrder', async (orderId: string) => {
    const response = await instance.delete(`/order/${orderId}`);
    return { ...response.data, orderId };
})

export type AuthInitStateType = {
    loginData: ILData
    subscribeData: ISubscribeData
    totalCartSum: any,
}

const initialState: AuthInitStateType = {
    loginData: {
        data: null,
        status: 'loaded',
        serverMessage: '',
    },
    subscribeData: {
        email: '',
        responseMsg: '',
    },
    totalCartSum: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        subscribe(state) {
            state.subscribeData.responseMsg = 'Ваш промокод на скидку 8% направлен на e-mail. Спасибо.'
        },

        sendPromoCode(state, action: PayloadAction<string>) {
            state.subscribeData.responseMsg = action.payload
        },

        updateCart(state, action) {
            if (state.loginData?.data) {
                state.loginData.data.cart[action.payload.cartItemIndex] = action.payload.newCartItem;
            }
        },

        pushPriceToTotal(state, action) {
            state.totalCartSum[action.payload.id] = action.payload.sum;
        },

        

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.loginData.status = 'loading';
        })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loginData.status = 'loaded';
                state.loginData.data = action.payload.data.user;
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
                state.loginData.status = 'loaded'
                state.loginData.data = action.payload.user
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.loginData.status = 'error';
                if (action.error.message === 'Request failed with status code 400') {
                    state.loginData.serverMessage = 'Пользователь с таким email уже зарегистрирован';
                } else {
                    state.loginData.serverMessage = 'сервис недоступен';
                }
                state.loginData.data = null;
            })

            .addCase(fetchAddToFavorites.pending, (state, action) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchAddToFavorites.fulfilled, (state, action: PayloadAction<string[]>) => {
                if (state.loginData.data != null) {
                    state.loginData.data.favourites = action.payload;
                    state.loginData.status = 'loaded';
                }
            })
            .addCase(fetchAddToFavorites.rejected, (state,) => {
                state.loginData.status = 'error';
            })


            .addCase(fetchRemoveFromFavorites.pending, (state,) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchRemoveFromFavorites.fulfilled, (state, action) => {
                if (state.loginData.data != null) {
                    state.loginData.data.favourites = action.payload;
                    state.loginData.status = 'loaded';
                }
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
                if (state.loginData.data?.cart) {
                    state.loginData.data.cart = action.payload.cart;
                }
                state.loginData.status = 'loaded';
                let key: string = action.payload.deletedProductId
                if (key) {
                    delete state.totalCartSum[key]
                }
            })
            .addCase(fetchRemoveEyewearFromCart.rejected, (state) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchDeleteOrder.pending, (state, action) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchDeleteOrder.fulfilled, (state, action) => {
                if (state.loginData.data?.orders) {
                    state.loginData.data.orders = state.loginData.data.orders.filter(el => el !== action.payload.orderId);
                }
                state.loginData.status = 'loaded';

            })
            .addCase(fetchDeleteOrder.rejected, (state) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchUpdateCart.pending, (state) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchUpdateCart.fulfilled, (state, action) => {
                if (state.loginData.data?.cart) {
                    state.loginData.data.cart = action.payload;
                }
                state.loginData.status = 'loaded';
            })
            .addCase(fetchUpdateCart.rejected, (state) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchCreateOrder.pending, (state) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchCreateOrder.fulfilled, (state, action) => {
                state.loginData.data?.orders.push(action.payload._id);
                state.loginData.status = 'loaded';
            })
            .addCase(fetchCreateOrder.rejected, (state) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchAddValuesToOrder.pending, (state) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchAddValuesToOrder.fulfilled, (state, action) => {
                state.loginData.status = 'loaded';
            })
            .addCase(fetchAddValuesToOrder.rejected, (state) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchEditOrder.pending, (state) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchEditOrder.fulfilled, (state, action) => {
                state.loginData.status = 'loaded';
            })
            .addCase(fetchEditOrder.rejected, (state) => {
                state.loginData.status = 'error';
            })

            .addCase(fetchConFirmOrder.pending, (state) => {
                state.loginData.status = 'loading';
            })
            .addCase(fetchConFirmOrder.fulfilled, (state, action) => {
                if (state.loginData.data?.cart) {
                    state.loginData.data.cart = []
                }
                state.loginData.status = 'loaded'
            })
            .addCase(fetchConFirmOrder.rejected, (state) => {
                state.loginData.status = 'error';
            })

    },

});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.loginData.data);
export const selectIsManager = (state: RootState) => Boolean(state.auth.loginData.data?.role === 'ADMIN');

export const { subscribe, updateCart, pushPriceToTotal, sendPromoCode, } = authSlice.actions;
export default authSlice.reducer;