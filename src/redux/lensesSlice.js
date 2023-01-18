import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./API/api.js";
import { defineSize } from "./functions/defineSize.js";

export const fetchLenses = createAsyncThunk('lenses/fetchProducts', async () => {
    const { data } = await instance.get('/lenses');
    return data;
});
export const fetchFilteredProducts = createAsyncThunk('lenses/fetchProducts', async () => {
    const { data } = await instance.get('/lenses');
    return data;
});
export const fetchProd = createAsyncThunk('lenses/fetchProd', async (id) => { 
    const data = await instance.get(`/lenses/${id}`);
    return data.data;
});
export const fetchDeleteProd = createAsyncThunk('lenses/fetchDeleteProd', async (id) => {
    const data = await instance.delete(`/lenses/` + id);
    console.log(data);
    if (data.data.success === 'true') {
    }
    return {data: data.data, id};
});

export const fetchSearch = createAsyncThunk('lenses/fetchSearch', async (query) => {
    //console.log(query)
    const response = await instance.post(`/lenses/search`, { query });
    //console.log(response);
    return response.data;
});



const lensesSlice = createSlice({
    name: 'lenses',
    initialState: {
        products: {
            items: [ ],
            status: 'loading',
        },
    
        currentProduct: {item: null, status: 'loaded' },
        searchResult: {items: [], status: 'loaded' },
        tags: { items: [], status: 'loaded', },
    },
    reducers: {
      
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
        builder.addCase(fetchLenses.pending, (state) => {
            state.products.items = [];
            state.products.status = 'loading';
        })
        .addCase(fetchLenses.fulfilled, (state, action) => {
            state.products.items = action.payload;
            state.products.status = 'loaded';
        })
        .addCase(fetchLenses.rejected, (state) => {
            state.products.items = [];
            state.products.status = 'error';
        })


        .addCase(fetchDeleteProd.pending, (state) => {
            state.products.status = 'loading';
        })
        .addCase(fetchDeleteProd.fulfilled, (state, action) => {
            state.products.items = state.products.items.filter( prod => prod.id !== action.payload );
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

        .addCase(fetchSearch.pending, (state ) => {
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
    clearSearchResults,
} = lensesSlice.actions;

export default lensesSlice.reducer;