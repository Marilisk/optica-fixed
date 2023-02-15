import { createSlice } from "@reduxjs/toolkit";
import { FeaturesInitialStateType } from "../Components/Types/types";


const initialState:FeaturesInitialStateType = {
    features: [
        {
            id: 1,
            label: 'Производитель',
            name: 'manufacturer',
            options: ['Johnson & Johnson', 'Alcon', 'Aquamax', 'Bausch + Lomb', 'FreshLook', 'Gelflex', 'Maxima Optics', 'Adria', 'Optima', 'PureVision', 'Soflens',],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 2,
            label: 'Цветность',
            name: 'color',
            options: ['прозрачные', 'цветные'],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 3,
            label: 'Срок замены',
            name: 'periodity',
            options: ['2 недели', '1 день', '3 месяца', '1 месяц', '6 месяцев'],
            chosenOptions: [],
            isSelected: false,
        },
        {
            id: 4,
            label: 'Штук в упаковке',
            name: 'amountInPack',
            options: ['2', '4', '6', '8', '30', '60', '90'],
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
    name: 'lensfilters',
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
        clearAllFilters(state) {
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
            /* builder.addCase( fetchFilterOptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                state.features.find(filter => filter.name === action.payload.filterName).options = action.payload.data;
                state.status = 'loaded';
            })
            .addCase(fetchFilterOptions.rejected, (state) => {
                state.status = 'error';
            }) */
        },
})

export const { selectFilter, clearAllFilters, setSortTag} = featuresSlice.actions;
export default featuresSlice.reducer;