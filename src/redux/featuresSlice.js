import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./API/api";

export const fetchFilterOptions = createAsyncThunk('filters/fetchFilterOptions', async (filterName) => {
    const { data } = await instance.get(`/${filterName}`);
    //console.log(data);
    return {data, filterName};
})

const featuresSlice = createSlice({
    name: 'filters',
    initialState: {
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

    },
    reducers: {
        selectFilter(state, action) {
            const item = state.features.find((el) => el.id === action.payload.feature);
            let isOptionChosen = item.chosenOptions.includes(action.payload.option);
            if (isOptionChosen) {
                item.chosenOptions = item.chosenOptions.filter(chosenOption => chosenOption !== action.payload.option);
                item.options.push(action.payload.option);
                item.isSelected = item.chosenOptions.length;
            } else {
                item.chosenOptions.push(action.payload.option);
                item.options = item.options.filter(opt => opt !== action.payload.option);
                item.isSelected = item.chosenOptions.length;
            }
        },
        clearAllFilters(state, action) {
            for (let filter of state.features) {
                filter.chosenOptions = [];
            }
        },
    },
        extraReducers: (builder) => {
            builder.addCase( fetchFilterOptions.pending, (state, action) => {
                //state.features[action.filterName].options = [];
                state.status = 'loading';
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                //console.log(action.payload)
                state.features.find(filter => filter.name === action.payload.filterName).options = action.payload.data;
                state.status = 'loaded';
            })
            .addCase(fetchFilterOptions.rejected, (state, action) => {
                //state.features[action.filterName].options = [];
                state.status = 'error';
            })
        },

    
})

export const { selectFilter, clearAllFilters } = featuresSlice.actions;
export default featuresSlice.reducer;