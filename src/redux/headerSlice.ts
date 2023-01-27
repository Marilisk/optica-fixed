import { createSlice } from "@reduxjs/toolkit";
import { HeaderInitialStateType } from "../Components/Types/types";


const initialState:HeaderInitialStateType = {
        fullHeader: true,
        menuOpened: null,
        loginModalOpened: false,
        mainMenu: [
            {
                name: 'Женщины',
                url: `women`,
                links: [
                    { label: 'Все оправы', to: '/women' },
                    { label: 'Очки для чтения', to: '/women', featureFilter: 'для чтения' },
                ]
            },
            {
                name: 'Мужчины',
                url: `men`,
                links: [
                    { label: 'Все оправы', to: '/men' },
                    { label: 'Очки для чтения', to: '/men', featureFilter: 'для чтения' },
                ]
            },
            {
                name: 'Дети',
                url: `children`,
                links: [
                    { label: 'Все оправы', to: '/children' },
                    { label: 'Для самых маленьких', to: '/children', featureFilter: 'Для самых маленьких' },
                ]
            },
            {
                name: 'Линзы',
                url: `lenses`,
                links: [
                    { label: 'Все линзы', to: '/lenses' },
                    { label: 'Однодневные', to: '/lenses', featureFilter: 'однодневные' },
                    { label: 'Цветные', to: '/lenses', featureFilter: 'цветные' },
                    { label: 'Астигматизм', to: '/lenses', featureFilter: 'астигматизм' },
                ]
            },
        ],
}

const headerSlice = createSlice({
    name: 'header',
    initialState, 
    reducers: {
        setfullHeaderTheme(state, action) {
            state.fullHeader = action.payload;
        },
        toggleMenuOpened(state, action) {
            state.menuOpened = action.payload;
        },
        toggleLoginModalOpened(state, action) {
            state.loginModalOpened = action.payload;
        },
    }
})

export const { setfullHeaderTheme, toggleMenuOpened, toggleLoginModalOpened, } = headerSlice.actions;
export default headerSlice.reducer;