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
            options: ['круглые', 'прямоугольные', 'квадратные', 'авиаторы', 'cat eye'],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 5,
            label: 'Материал',
            name: 'material',
            options: ['пластик', 'сталь'],
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
            options: ['подростковые', 'офисные',],
            chosenOptions: [],
            isSelected: false,
        },
    ],

    sortTags: {
        tags: [
            { id: 1, label: 'по релевантности', name: 'byRelevance' },
            { id: 2, label: 'по уменьшению цены', name: 'priceHighToLow' },
            { id: 3, label: 'по увеличению цены', name: 'priceLowToHigh' },
            { id: 4, label: 'по количеству продаж', name: 'bestsellers' },
        ],
        chosenTag: 1, 
    } ,

    status: '',
    goodsAmount: 0,
    filteredProducts: [],

}

const featuresSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        selectFilter(state, action) {
            const item = state.features.find((el) => el.id === action.payload.feature);
            let thisIndex:number = state.features.indexOf(item);
            let isOptionChosen = state.features[thisIndex].chosenOptions.includes(action.payload.option);
            
            if (isOptionChosen) {
                state.features[thisIndex].chosenOptions = state.features[thisIndex].chosenOptions.filter(chosenOption => chosenOption !== action.payload.option);
                state.features[thisIndex].options.push(action.payload.option);
                state.features[thisIndex].isSelected = Boolean(state.features[thisIndex].chosenOptions.length);
            } else {
                state.features[thisIndex].chosenOptions.push(action.payload.option);
                state.features[thisIndex].options = state.features[thisIndex].options.filter(opt => opt !== action.payload.option);
                state.features[thisIndex].isSelected = Boolean(state.features[thisIndex].chosenOptions.length);
            }            
        },
        clearAllFilters(state, action) {
            for (let filter of state.features) {
                if(filter.isSelected) {
                    filter.options.concat(filter.chosenOptions)
                    filter.chosenOptions = [];
                    filter.isSelected = false;
                }   
            }
        },
        setSortTag(state, action) {
            state.sortTags.chosenTag = action.payload
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

export const { selectFilter, clearAllFilters, setSortTag} = featuresSlice.actions;
export default featuresSlice.reducer;