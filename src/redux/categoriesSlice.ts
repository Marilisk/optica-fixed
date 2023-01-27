import { createSlice } from "@reduxjs/toolkit";
import { CategotiesInitialStateType } from "../Components/Types/types";



const initialState:CategotiesInitialStateType = {
    categories: [
        {
            model: "shop.category",
            pk: 3,
            fields: {
                name: "Оправы",
                "parent": 8,
                "slug": "eyeglasses",
                photo: "a",
                "lft": 2,
                "rght": 5,
                "tree_id": 1,
                "level": 1
            }
        },
        {
            model: "shop.category",
            pk: 4,
            fields: {
                name: "Готовые очки",
                "parent": 3,
                "slug": "done",
                photo: "b",
                "lft": 3,
                "rght": 4,
                "tree_id": 1,
                "level": 2
            }
        },
        {
            model: "shop.category",
            pk: 7,
            fields: {
                name: "Прогрессивные линзы",
                "parent": 8,
                "slug": "progressives",
                photo: "c",
                "lft": 6,
                "rght": 7,
                "tree_id": 1,
                "level": 1
            }
        },
        {
            model: "shop.category",
            pk: 1,
            fields: {
                name: "Солнечные очки",
                "parent": 8,
                "slug": "opravy",
                photo: "d",
                "lft": 8,
                "rght": 15,
                "tree_id": 1,
                "level": 1
            }
        },
        {
            model: "shop.category",
            pk: 2,
            fields: {
                name: "Blue Light",
                "parent": 1,
                "slug": "blue-light",
                photo: "e",
                "lft": 9,
                "rght": 10,
                "tree_id": 1,
                "level": 2
            }
        },
        {
            model: "shop.category",
            pk: 5,
            fields: {
                name: "Для чтения",
                "parent": 1,
                "slug": "opravy-muzhskie",
                photo: "f",
                "lft": 13,
                "rght": 14,
                "tree_id": 1,
                "level": 2
            }
        }
    ]

}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        onSelectCategory(state, action) {


        },

    }
})

export const { onSelectCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;