import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FeaturesInitialStateType } from "../Components/Types/types";
import instance from "./API/api";

export const fetchFilterOptions = createAsyncThunk('filters/fetchFilterOptions', async (filterName:string) => {
    const { data } = await instance.get(`/${filterName}`);
    return {data, filterName};
})



const initialState:FeaturesInitialStateType = {
    features: [
        {
            id: 2,
            label: 'Гендер',
            name: 'gender',
            options: ['Мужские', 'Женские'],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 3,
            label: 'Цвет',
            name: 'color',
            options: [],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 4,
            label: 'Форма',
            name: 'shape',
            options: ['круги', 'прямоугольные', 'золото', 'серебро', 'белый'],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 5,
            label: 'Материал',
            name: 'material',
            options: ['пластик', 'металл'],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 6,
            label: 'Ширина',
            name: 'size',
            options: ['узкие', 'средние', 'широкие'],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 7,
            label: 'Особенности',
            name: 'features',
            options: ['чёрный', 'красный', 'золото', 'серебро', 'белый'],
            chosenOptions: [],
            isSelected: false,
        },
    ],

    status: '',

}

const featuresSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        selectFilter(state, action) {
            const item = state.features.find((el) => el.id === action.payload.feature);
            let isOptionChosen = item.chosenOptions.includes(action.payload.option);
            if (isOptionChosen) {
                item.chosenOptions = item.chosenOptions.filter(chosenOption => chosenOption !== action.payload.option);
                item.options.push(action.payload.option);
                item.isSelected = Boolean(item.chosenOptions.length);
            } else {
                item.chosenOptions.push(action.payload.option);
                item.options = item.options.filter(opt => opt !== action.payload.option);
                item.isSelected = Boolean(item.chosenOptions.length);
            }
        },
        clearAllFilters(state, action) {
            for (let filter of state.features) {
                filter.chosenOptions = [];
            }
        },
    },
        extraReducers: (builder) => {
            builder.addCase( fetchFilterOptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                state.features.find(filter => filter.name === action.payload.filterName).options = action.payload.data;
                state.status = 'loaded';
            })
            .addCase(fetchFilterOptions.rejected, (state) => {
                state.status = 'error';
            })
        },
})

export const { selectFilter, clearAllFilters } = featuresSlice.actions;
export default featuresSlice.reducer;