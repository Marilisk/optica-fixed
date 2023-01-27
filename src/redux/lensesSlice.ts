import { LoadingStatusEnum, ILensProduct } from './../Components/Types/types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./API/api.js";

export const fetchLenses = createAsyncThunk('lenses/fetchProducts', async () => {
    const { data } = await instance.get('/lenses');
    return data;
});
export const fetchFilteredProducts = createAsyncThunk('lenses/fetchProducts', async () => {
    const { data } = await instance.get('/lenses');
    return data;
});
export const fetchProd = createAsyncThunk('lenses/fetchProd', async (id:string) => { 
    const data = await instance.get(`/lenses/${id}`);
    return data.data;
});
export const fetchDeleteProd = createAsyncThunk('lenses/fetchDeleteProd', async (id:string) => {
    const data = await instance.delete(`/lenses/` + id);
    console.log(data);
    if (data.data.success === 'true') {
    }
    return {data: data.data, id};
});

/* export const fetchSearch = createAsyncThunk('lenses/fetchSearch', async (query:string) => {
    const response = await instance.post(`/lenses/search`, { query });
    return response.data;
}); */

export type LensProductsType = {
    items: ILensProduct[]
    status: LoadingStatusEnum
}
export type CurrentProductType = {
    item: ILensProduct
    status: LoadingStatusEnum
}
export type LensesInitialStateType = {
    products: LensProductsType
    currentProduct: CurrentProductType
}

const initialState:LensesInitialStateType = {
    products: {
        items: [ ],
        status: LoadingStatusEnum.loaded,
    },

    currentProduct: {item: null, status: LoadingStatusEnum.loaded},
}

const lensesSlice = createSlice({
    name: 'lenses',
    initialState,
    reducers: {
      
        setCurrentProd(state, action) {
            state.currentProduct.item = action.payload;
            state.currentProduct.status = LoadingStatusEnum.loaded;
        },

        /* clearSearchResults(state) {
            state.searchResult.items = [];
            state.searchResult.status = LoadingStatusEnum.loaded;
        } */

    },
    extraReducers: (builder) => {
        builder.addCase(fetchLenses.pending, (state) => {
            state.products.items = [];
            state.products.status = LoadingStatusEnum.loading;
        })
        .addCase(fetchLenses.fulfilled, (state, action) => {
            state.products.items = action.payload;
            state.products.status = LoadingStatusEnum.loaded;
        })
        .addCase(fetchLenses.rejected, (state) => {
            state.products.items = [];
            state.products.status = LoadingStatusEnum.error;
        })


        .addCase(fetchDeleteProd.pending, (state) => {
            state.products.status = LoadingStatusEnum.loading;
        })
        .addCase(fetchDeleteProd.fulfilled, (state, action) => {
            state.products.items = state.products.items.filter( prod => prod._id !== action.payload.id );
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
            
            state.currentProduct.status = LoadingStatusEnum.loaded;
        })
        .addCase(fetchProd.rejected, (state) => {
            state.currentProduct.status = LoadingStatusEnum.error;
        })

        /* .addCase(fetchSearch.pending, (state ) => {
            state.searchResult.status = LoadingStatusEnum.loading;
        })
        .addCase(fetchSearch.fulfilled, (state, action) => {
            state.searchResult.items = action.payload;
            state.searchResult.status = LoadingStatusEnum.loaded;
        })
        .addCase(fetchSearch.rejected, (state) => {
            state.searchResult.status = LoadingStatusEnum.error;
        }) */
        
        
    },
})

export const {
    setCurrentProd
} = lensesSlice.actions;

export default lensesSlice.reducer;