import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { selectAllProducts } from "./allProductsSlice";


export const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, { payload }) {
            return state = payload;
        }
    }
});

export const { setFilter } = filterSlice.actions;
export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer;