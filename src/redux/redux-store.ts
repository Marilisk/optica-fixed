import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import featuresSlice from "./featuresSlice";
import headerSlice from "./headerSlice";
import authSlice from "./authSlice";
import productsSlice from "./productsSlice";
import lensesSlice from "./lensesSlice";
import lensFeaturesSlice from "./lensFeaturesSlice";


export const store = configureStore({
    reducer: {
        header: headerSlice,
        filters: featuresSlice,
        products: productsSlice,
        categories: categoriesSlice,
        auth: authSlice,
        lenses: lensesSlice,
        lensfilters: lensFeaturesSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch