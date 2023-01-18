import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./API/api.js";
import { defineSize } from "./functions/defineSize.js";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const { data } = await instance.get('/products');
    return data;
});
export const fetchFilteredProducts = createAsyncThunk('products/fetchProducts', async () => {
    const { data } = await instance.get('/products');
    return data;
});
export const fetchProd = createAsyncThunk('products/fetchProd', async (id) => {
    const data = await instance.get(`/products/${id}`);
    return data.data;
});

export const fetchDeleteProd = createAsyncThunk('products/fetchDeleteProd', async (id) => {
    const data = await instance.delete(`/products/` + id);
    console.log(data);
    return { data: data.data, id };
});

export const fetchSearch = createAsyncThunk('products/fetchSearch', async (query) => {
    //console.log(query)
    const response = await instance.post(`/products/search`, { query });
    //console.log(response);
    return response.data;
});


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: {
            items: [],
            status: 'loaded',
        },

        currentProduct: { item: null, status: 'loading' },
        searchResult: { items: [], status: 'loaded' },
        tags: {
            items: [],
            status: 'loaded',
        },

    },
    reducers: {
        onAddToCart(state, action) {
            //const item = state.items.find(el => el.id === action.payload.item);
        },

        setCurrentProd(state, action) {
            state.currentProduct.item = action.payload;
            state.currentProduct.status = 'loaded';
        },

        clearSearchResults(state) {
            state.searchResult.items = [];
            state.searchResult.status = 'loaded';
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.products.items = [];
            state.products.status = 'loading';
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.items = action.payload;
                state.products.items.forEach(product => {
                    product.size = defineSize(product.frameWidth)
                });
                state.products.status = 'loaded';
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products.items = [];
                state.products.status = 'error';
            })


            .addCase(fetchDeleteProd.pending, (state) => {
                state.products.status = 'loading';
            })
            .addCase(fetchDeleteProd.fulfilled, (state, action) => {
                state.products.items = state.products.items.filter(prod => prod.id !== action.payload);
                state.currentProduct.status = 'loaded';
            })
            .addCase(fetchDeleteProd.rejected, (state) => {
                state.products.status = 'loaded';
            })


            .addCase(fetchProd.pending, (state) => {
                state.currentProduct.status = 'loading';
            })
            .addCase(fetchProd.fulfilled, (state, action) => {
                state.currentProduct.item = action.payload;
                state.currentProduct.item.size = defineSize(state.currentProduct.item.frameWidth);
                state.currentProduct.status = 'loaded';
            })
            .addCase(fetchProd.rejected, (state) => {
                state.currentProduct.status = 'error';
            })

            .addCase(fetchSearch.pending, (state) => {
                state.searchResult.status = 'loading';
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.searchResult.items = action.payload;
                state.searchResult.status = 'loaded';
            })
            .addCase(fetchSearch.rejected, (state) => {
                state.searchResult.status = 'error';
            })


    },
})

export const {
    onAddToCart,/* 
    anotherBestsellers, */
    setCurrentProd,
    clearSearchResults,
} = productsSlice.actions;

export default productsSlice.reducer;