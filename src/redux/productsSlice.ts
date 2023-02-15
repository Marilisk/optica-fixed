import { ICartItemWithSum, IUser } from './../Components/Types/types';
import { createAppAsyncThunk } from './hooks';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatusEnum, ProdInitialStateType } from "../Components/Types/types";
import instance from "./API/api.js";
import { defineSize } from "./functions/defineSize.js";
import { cartWithSumsCreator } from './functions/useOrderCreator';

const wait = (ms: number) =>
    new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms);
    });

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const { data } = await instance.get('/products');
        return data;
    });
export const fetchFilteredProducts = createAsyncThunk('products/fetchProducts', async () => {
    const { data } = await instance.get('/products');
    return data;
});
export const fetchProd = createAsyncThunk('products/fetchProd', async (id: string) => {
    const data = await instance.get(`/products/${id}`);
    return data.data;
});

export const fetchDeleteProd = createAsyncThunk('products/fetchDeleteProd', async (id: string) => {
    const data = await instance.delete(`/products/` + id);
    console.log(data);
    return { data: data.data, id };
});

export const fetchSearch = createAsyncThunk('products/fetchSearch', async (query: string) => {
    const response = await instance.post(`/products/search`, { query });
    return response.data;
});

export const fetchCollectCartPrices = createAppAsyncThunk('products/CollectCartPrices',
    async (_, thunkApi) => {
        const state = thunkApi.getState()
        const authData: IUser = state.auth.loginData.data;
        const cartWithSums: ICartItemWithSum[] = await cartWithSumsCreator(authData)
        //console.log(cartWithSums)
        return cartWithSums
    })


const initialState: ProdInitialStateType = {
    products: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },

    currentProduct: { item: null, status: LoadingStatusEnum.loaded },
    searchResult: { items: [], status: LoadingStatusEnum.loaded },
    tags: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },

    currentCartWithSums: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },

    processedOrder: {
        order: null,
        status: LoadingStatusEnum.loaded,
    },

    cartInLSLength: 0,

}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentProd(state, action) {
            state.currentProduct.item = action.payload;
            state.currentProduct.status = LoadingStatusEnum.loaded
        },

        clearSearchResults(state) {
            state.searchResult.items = [];
            state.searchResult.status = LoadingStatusEnum.loaded;
        },

        setProcessedOrder(state, action) {
            state.processedOrder.order = action.payload
            state.processedOrder.status = LoadingStatusEnum.loaded
        },

        setCartInLSLength(state, action) {
            state.cartInLSLength = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            //state.products.items = [];
            state.products.items = action.meta.arg;
            state.products.status = LoadingStatusEnum.loading;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.items = action.payload;
                state.products.items.forEach(product => {
                    product.size = defineSize(product.frameWidth)
                });
                state.products.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products.items = [];
                state.products.status = LoadingStatusEnum.error;
            })


            .addCase(fetchDeleteProd.pending, (state) => {
                state.products.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchDeleteProd.fulfilled, (state, action) => {
                state.products.items = state.products.items.filter(prod => prod._id !== action.payload.id);
                state.currentProduct.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchDeleteProd.rejected, (state) => {
                state.products.status = LoadingStatusEnum.error;
            })


            .addCase(fetchProd.pending, (state) => {
                state.currentProduct.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchProd.fulfilled, (state, action) => {
                state.currentProduct.item = action.payload;
                state.currentProduct.item.size = defineSize(state.currentProduct.item.frameWidth);
                state.currentProduct.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchProd.rejected, (state) => {
                state.products.status = LoadingStatusEnum.error;

            })

            .addCase(fetchSearch.pending, (state) => {
                state.searchResult.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.searchResult.items = action.payload;
                state.searchResult.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchSearch.rejected, (state) => {
                state.products.status = LoadingStatusEnum.error;

            })

            .addCase(fetchCollectCartPrices.pending, (state) => {
                state.currentCartWithSums.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchCollectCartPrices.fulfilled, (state, action) => {
                state.currentCartWithSums.items = action.payload;
                state.currentCartWithSums.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchCollectCartPrices.rejected, (state) => {
                state.currentCartWithSums.status = LoadingStatusEnum.error;
            })
    },
})

export const {
    setCurrentProd,
    clearSearchResults,
    setProcessedOrder,
    setCartInLSLength,
} = productsSlice.actions;

export default productsSlice.reducer;